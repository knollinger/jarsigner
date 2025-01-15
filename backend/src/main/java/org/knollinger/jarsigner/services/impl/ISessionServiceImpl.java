package org.knollinger.jarsigner.services.impl;

import org.knollinger.jarsigner.exceptions.InvalidCredentialsException;
import org.knollinger.jarsigner.models.LoginRequest;
import org.knollinger.jarsigner.models.LoginResponse;
import org.knollinger.jarsigner.services.ISessionService;
import org.springframework.stereotype.Service;

@Service
public class ISessionServiceImpl implements ISessionService
{
    @Override
    public LoginResponse login(LoginRequest req) throws InvalidCredentialsException
    {
        if (req.getUser().equalsIgnoreCase("wrong") || req.getPassword().equalsIgnoreCase("wrong"))
        {
            throw new InvalidCredentialsException();
        }
        return LoginResponse.builder().token("testToken").build();
    }
}
