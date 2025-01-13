package rz.bankenit.jarsigner.services;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import rz.bankenit.jarsigner.models.SignerResponse;

/**
 * 
 */
public interface ISignerService
{
    /** 
     * signiert alle im files-Array übertragenen Dateien und pack diese in ein ZIP-Archiv.
     * 
     * @param files
     * 
     * @return Das ZIP-Archiv
     * @throws InterruptedException 
     * @throws Exception 
     */
    public SignerResponse signJars(MultipartFile[] files) throws IOException, InterruptedException, Exception;
    
    /**
     * @param taskId
     * @return
     */
    public File getArchive(UUID taskId);
}
