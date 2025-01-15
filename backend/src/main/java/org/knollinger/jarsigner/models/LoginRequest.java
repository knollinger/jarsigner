package org.knollinger.jarsigner.models;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class LoginRequest
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String user;
    
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String password;
}
