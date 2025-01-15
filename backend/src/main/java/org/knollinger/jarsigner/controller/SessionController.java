package org.knollinger.jarsigner.controller;

import org.knollinger.jarsigner.dtos.LoginRequestDTO;
import org.knollinger.jarsigner.dtos.LoginResponseDTO;
import org.knollinger.jarsigner.exceptions.InvalidCredentialsException;
import org.knollinger.jarsigner.mapper.ISessionMapper;
import org.knollinger.jarsigner.models.LoginRequest;
import org.knollinger.jarsigner.models.LoginResponse;
import org.knollinger.jarsigner.services.ISessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * 
 */
@RestController
@RequestMapping(path = "/v1/session")
public class SessionController
{
    @Autowired
    private ISessionService sessionSvc;

    @Autowired
    private ISessionMapper sessionMapper;

    /**
     * @param req
     * @return
     */
    @PostMapping(path = "login")
    public LoginResponseDTO onLogin(@RequestBody LoginRequestDTO req)
    {
        try
        {
            LoginRequest request = this.sessionMapper.fromDTO(req);
            LoginResponse result = this.sessionSvc.login(request);
            return this.sessionMapper.toDTO(result);
        }
        catch (InvalidCredentialsException e)
        {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
        }
    }
}
