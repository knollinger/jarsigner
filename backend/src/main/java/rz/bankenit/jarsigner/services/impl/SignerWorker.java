package rz.bankenit.jarsigner.services.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.web.multipart.MultipartFile;

import jdk.security.jarsigner.JarSigner;
import lombok.extern.log4j.Log4j2;
import rz.bankenit.jarsigner.models.JarState;
import rz.bankenit.jarsigner.models.SignerResponse;
import rz.bankenit.jarsigner.models.SignerResponse.SignerResponseBuilder;

/**
 * Implementiert die Signatur-Fabrik.
 * 
 * Um das ganze schneller zu machen parallelisiert der {@link SignerWorker} 
 * das signieren der JarFiles in einem ExecutorService.
 * 
 * Trotzdem erscheint der Aufruf der {@link SignerWorker#signJars(File, PrivateKeyEntry, MultipartFile[]))}
 * nach außen hin synchron. 
 */
@Log4j2
class SignerWorker
{
    private static ExecutorService threadPool = null;

    /**
     * Startet die Signatur aller JAR-Files im Multipart-Array
     * 
     * Die Methode delegiert das ganze in einen 
     * ThreadPool, wirkt nach außen aber synchron.
     * 
     * 
     * @param files die zu signierendenden Files aus dem Multipart-Array
     * @param signer der zu verwendende JarSigner
     * @param files die Files aus dem empfangenden Multipart-Array
     * 
     * @throws IOException 
     * @throws InterruptedException 
     * @eturns Die TaskId des Signatur-Vorgangs
     */
    public SignerResponse signJars(File workingDir, JarSigner signer, MultipartFile[] files)
        throws IOException, InterruptedException
    {
        UUID taskId = UUID.randomUUID();
        log.info("start signing of {} files as task {}", files.length, taskId);

        File tmpDir = new File(workingDir, taskId.toString());
        tmpDir.mkdirs(); // result checken!

        try
        {
            CountDownLatch latch = new CountDownLatch(files.length);
            List<File> signedJars = new ArrayList<>();
            List<JarState> errors = new ArrayList<>();
            SignerContext ctxt = new SignerContext(tmpDir, signer, latch, signedJars, errors);

            ExecutorService exec = this.getExecutor();
            for (MultipartFile file : files)
            {
                SignerTask task = new SignerTask(file, ctxt);
                exec.execute(task);
            }
            latch.await();

            this.createArchive(workingDir, taskId, ctxt.signedJars());

            return SignerResponse.builder() //
                .taskId(taskId) //
                .jarErrors(errors) //
                .build();
        }
        finally
        {
            tmpDir.delete();
        }
    }

    /**
     * @param tmpDir
     * @param signedJars
     * @return
     * @throws IOException
     */
    private void createArchive(File workingDir, UUID taskId, List<File> signedJars) throws IOException
    {
        File result = new File(workingDir, String.format("%1$s.zip", taskId.toString()));
        ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(result));

        for (File jar : signedJars)
        {
            log.info("add {} to archive {}", jar.getName(), result.getName());
            ZipEntry entry = new ZipEntry(jar.getName());
            zipOut.putNextEntry(entry);
            Files.copy(jar.toPath(), zipOut);
            zipOut.flush();
            jar.delete();
        }
        zipOut.close();
    }

    /**
     * 
     * @return
     */
    private synchronized ExecutorService getExecutor()
    {
        if (SignerWorker.threadPool == null)
        {
            int numThreads = Math.max(4, Runtime.getRuntime().availableProcessors());
            SignerWorker.threadPool = Executors.newFixedThreadPool(numThreads, new ThreadFactory()
            {
                @Override
                public Thread newThread(Runnable task)
                {
                    Thread t = new Thread(task);
                    t.setDaemon(true);
                    return t;
                }
            });
        }
        return SignerWorker.threadPool;
    }
}
