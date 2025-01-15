package org.knollinger.jarsigner.models;

import java.util.List;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class SignerResponse
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private UUID taskId;
    
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private List<JarState> jarErrors;
}
