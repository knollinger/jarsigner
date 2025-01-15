package org.knollinger.jarsigner.services.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipFile;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.knollinger.jarsigner.models.JarState;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;

/**
 * Implementiert das Runnable, um ein JarFile zu signieren. Dieses
 * Runnable wird dem {@link SignerWorker} zur Ausführung übergeben.
 */
@Log4j2
class SignerTask implements Runnable
{
    private MultipartFile multipartFile;
    private SignerContext context;

    /**
     * @param file
     * @param countDownLatch
     * @param tmpDir
     */
    public SignerTask(MultipartFile file, SignerContext context)
    {
        this.multipartFile = file;
        this.context = context;
    }

    /**
     *
     */
    @Override
    public void run()
    {
        try
        {
            File signed = this.signJar();
            this.context.signedJars().add(signed);
        }
        catch (Exception e)
        {
            JarState error = JarState.builder() //
                .jarName(this.multipartFile.getOriginalFilename()) //
                .error(e.getMessage()) //
                .build();
            this.context.errors().add(error);
        }
        finally
        {
            this.context.countDownLatch().countDown();
        }
    }

    /**
     * Signiere das Multipart-File aus dem Context. Dazu wird das File in ein
     * tempFile innerhalb des aktuellen WorkingDirs ausgepackt und dem JarSigner
     * zu fressen gegeben.
     * 
     * Als Ergebniss liegt im WorkingDir ein File mit dem originalen FileName
     * aus dem MultipartFile vor, dieses wird dann auch zurück gegeben.
     * 
     * @param jar
     * @return
     * @throws IOException 
     */
    private File signJar() throws IOException
    {
        String fileName = this.multipartFile.getOriginalFilename();
        SignerTask.log.info("sign jar {}", fileName);

        File tmpJar = null;
        OutputStream fileOut = null;

        try
        {
            tmpJar = File.createTempFile("ajs-", ".tmp-jar", this.context.tmpDir());
            Files.copy(this.multipartFile.getInputStream(), tmpJar.toPath(), StandardCopyOption.REPLACE_EXISTING);

            File signed = new File(this.context.tmpDir(), fileName);
            fileOut = new FileOutputStream(signed);
            this.context.signer().sign(new ZipFile(tmpJar), fileOut);

            return signed;
        }
        finally
        {
            IOUtils.closeQuietly(fileOut);
            this.deleteQuitely(tmpJar);
        }
    }

    /**
     * 
     * @param tmpJar
     */
    private void deleteQuitely(File tmpJar)
    {
        if (tmpJar != null)
        {
            tmpJar.delete();
        }

    }
}