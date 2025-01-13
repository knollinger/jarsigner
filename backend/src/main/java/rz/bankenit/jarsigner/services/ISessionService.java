package rz.bankenit.jarsigner.services;

import rz.bankenit.jarsigner.exceptions.InvalidCredentialsException;
import rz.bankenit.jarsigner.models.LoginRequest;
import rz.bankenit.jarsigner.models.LoginResponse;

public interface ISessionService
{
    public LoginResponse login(LoginRequest req) throws InvalidCredentialsException;
}
