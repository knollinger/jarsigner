package rz.bankenit.jarsigner.models;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class LoginResponse
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String token;
}
