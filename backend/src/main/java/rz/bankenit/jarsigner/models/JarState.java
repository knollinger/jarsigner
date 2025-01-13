package rz.bankenit.jarsigner.models;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class JarState
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String jarName;

    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE) 
    private String error;
}
