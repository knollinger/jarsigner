package org.knollinger.jarsigner.mapper;

import org.knollinger.jarsigner.dtos.SignerResponseDTO;
import org.knollinger.jarsigner.models.SignerResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ISignerServiceMapper
{
    public SignerResponse fromDTO(SignerResponseDTO dto);
    public SignerResponseDTO toDTO(SignerResponse response);
}
