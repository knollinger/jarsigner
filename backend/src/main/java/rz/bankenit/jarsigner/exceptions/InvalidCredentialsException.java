package rz.bankenit.jarsigner.exceptions;

public class InvalidCredentialsException extends Exception
{
    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    public InvalidCredentialsException()
    {
        super("Die Benutzer-Kennung oder das Kennwort sind falsch.");
    }
}
