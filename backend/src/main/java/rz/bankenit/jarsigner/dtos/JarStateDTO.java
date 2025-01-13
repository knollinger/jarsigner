package rz.bankenit.jarsigner.dtos;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class JarStateDTO
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private String jarName;

    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE) 
    private String error;
}
