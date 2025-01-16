package org.knollinger.jarsigner.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.knollinger.jarsigner.dtos.SignerResponseDTO;
import org.knollinger.jarsigner.mapper.ISignerServiceMapper;
import org.knollinger.jarsigner.models.SignerResponse;
import org.knollinger.jarsigner.services.ISignerService;
import org.knollinger.jarsigner.utils.FileDeletingInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.log4j.Log4j2;

/**
 * 
 */
@RestController
@RequestMapping(path = "v1/signer")
@Log4j2
public class SignerController
{
    private static final String ERR_TASK_NOT_FOUND = "Kein Signatur-Task mit der ID '%1$s' gefunden.";
    private static final String ERR_LOAD_TASK = "Der Signatur-Task mit der ID '%1$s' konnte nicht geladen werden.";
    
    @Autowired()
    private ISignerService filesSvc;

    @Autowired
    private ISignerServiceMapper signerMapper;

    /**
     * Signiere die JAR-Files und liefere die Referenz auf das tempDirectory mit den Files zurück
     */
    @PutMapping()
    public SignerResponseDTO signJarFiles(@RequestParam(name = "file") MultipartFile[] files)
    {
        try
        {
            SignerResponse result = this.filesSvc.signJars(files);
            return this.signerMapper.toDTO(result);
        }
        catch (InterruptedException e)
        {
            Thread.currentThread().interrupt();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "Die JAR-Files konnten nicht signiert werden", e);
        }
        catch (Exception e)
        {
            log.throwing(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "Die JAR-Files konnten nicht signiert werden", e);
        }
    }

    /**
     * @param taskId
     * @return
     */
    @GetMapping(path = "/{taskId}")
    public ResponseEntity<InputStreamResource> getTaskResult(@PathVariable(name = "taskId") UUID taskId)
    {
        File result = this.filesSvc.getArchive(taskId);
        if (result == null || !result.exists())
        {
            String msg = String.format(ERR_TASK_NOT_FOUND, taskId.toString());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, msg);
        }

        try
        {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/zip");
            
            String contentDisp = String.format("attachment; filename=%1$s", result.getName());
            headers.add(HttpHeaders.CONTENT_DISPOSITION, contentDisp);
            
            InputStream in = new FileDeletingInputStream(result);
            return new ResponseEntity<>(new InputStreamResource(in), headers, HttpStatus.OK);
        }
        catch (IOException e)
        {
            String msg = String.format(ERR_LOAD_TASK, taskId.toString());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, msg, e);
        }
    }
}
