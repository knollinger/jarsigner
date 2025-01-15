package org.knollinger.jarsigner.dtos;

import java.util.List;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public class SignerResponseDTO
{
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private UUID taskId;


    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)
    private List<JarStateDTO> jarErrors;
}
