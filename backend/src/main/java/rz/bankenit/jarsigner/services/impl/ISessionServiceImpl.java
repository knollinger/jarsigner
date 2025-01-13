package rz.bankenit.jarsigner.services.impl;

import org.springframework.stereotype.Service;

import rz.bankenit.jarsigner.exceptions.InvalidCredentialsException;
import rz.bankenit.jarsigner.models.LoginRequest;
import rz.bankenit.jarsigner.models.LoginResponse;
import rz.bankenit.jarsigner.services.ISessionService;

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
