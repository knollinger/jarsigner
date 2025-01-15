package org.knollinger.jarsigner.dtos;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class LoginRequestDTO
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String user;
    
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String password;
}
