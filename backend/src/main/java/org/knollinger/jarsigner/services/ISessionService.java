package org.knollinger.jarsigner.services;

import org.knollinger.jarsigner.exceptions.InvalidCredentialsException;
import org.knollinger.jarsigner.models.LoginRequest;
import org.knollinger.jarsigner.models.LoginResponse;

public interface ISessionService
{
    public LoginResponse login(LoginRequest req) throws InvalidCredentialsException;
}
