package rz.bankenit.jarsigner.services.impl;

import java.io.File;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStore.PasswordProtection;
import java.security.KeyStore.PrivateKeyEntry;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jdk.security.jarsigner.JarSigner;
import lombok.extern.log4j.Log4j2;
import rz.bankenit.jarsigner.models.SignerResponse;
import rz.bankenit.jarsigner.services.ISignerService;

/**
 * 
 */
@Service
@Log4j2
public class ISignerServiceImpl implements ISignerService
{
    @Value("${signer.workingDir}")
    private File workingDir;

    @Value("${signer.maxTaskAge}")
    private long maxTaskAge;

    @Value("${signer.keystore.type}")
    private String keystoreType;

    @Value("${signer.keystore.path}")
    private String keystorePath;

    @Value("${signer.keystore.pwd}")
    private char[] keystorePwd;

    @Value("${signer.keystore.alias}")
    private String keystoreAlias;

    @Value("${signer.keystore.aliasPwd}")
    private char[] keystoreAliasPwd;

    private SignerWorker worker = new SignerWorker();

    private JarSigner signer = null;

    /**
     * Signiere die Jar-Files
     * @throws Exception 
     */
    @Override
    public SignerResponse signJars(MultipartFile[] files) throws Exception
    {
        this.workingDir.mkdirs(); // check response
        JarSigner signer = this.getJarSigner();

        return this.worker.signJars(this.workingDir, signer, files);
    }

    /**
     * liefere das Archiv für den Task. Es wird nur der erwartete Pfad innerhalb
     * des Working-Directories konstruiert, möglicherweile existiert das File aber
     * nicht mehr.
     */
    @Override
    public File getArchive(UUID taskId)
    {
        String path = String.format("%1$s.zip", taskId.toString());
        return new File(this.workingDir, path);
    }

    /**
     * Prüfe jede Minute ob noch tasks zum löschen vorhanden sind
     */
    @Scheduled(fixedRate = 60000)
    public void deleteOutdatedTasks()
    {
        log.info("check for outdated archives to delete");
        File[] allFiles = workingDir.listFiles();
        for (File file : allFiles)
        {
            if (file.isFile()) // neue IOUtils sollen auch Dirs löschen
            {
                long age = System.currentTimeMillis() - file.lastModified();
                if (age >= this.maxTaskAge)
                {
                    log.info("delete outdated archive '{}'", file.getName());
                    file.delete();
                }
            }
        }
    }

    /**
     * @return
     * @throws Exception
     */
    private synchronized JarSigner getJarSigner() throws Exception
    {
        if (this.signer == null)
        {
            try (InputStream in = this.getClass().getClassLoader().getResourceAsStream(this.keystorePath))
            {
                KeyStore store = KeyStore.getInstance(this.keystoreType);
                store.load(in, this.keystorePwd);

                PasswordProtection aliasPwd = new PasswordProtection(this.keystoreAliasPwd);
                PrivateKeyEntry pke = (PrivateKeyEntry) store.getEntry(this.keystoreAlias, aliasPwd);
                this.signer = new JarSigner.Builder(pke) //
                    // .signatureAlgorithm("SHA256") //
                    .build();
            }
        }
        return this.signer;
    }
}
