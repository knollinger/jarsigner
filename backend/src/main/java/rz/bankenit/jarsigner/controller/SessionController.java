package rz.bankenit.jarsigner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import rz.bankenit.jarsigner.dtos.LoginRequestDTO;
import rz.bankenit.jarsigner.dtos.LoginResponseDTO;
import rz.bankenit.jarsigner.exceptions.InvalidCredentialsException;
import rz.bankenit.jarsigner.mapper.ISessionMapper;
import rz.bankenit.jarsigner.models.LoginRequest;
import rz.bankenit.jarsigner.models.LoginResponse;
import rz.bankenit.jarsigner.services.ISessionService;

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
