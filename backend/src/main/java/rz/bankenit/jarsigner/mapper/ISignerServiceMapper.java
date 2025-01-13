package rz.bankenit.jarsigner.mapper;

import org.mapstruct.Mapper;

import rz.bankenit.jarsigner.dtos.SignerResponseDTO;
import rz.bankenit.jarsigner.models.SignerResponse;

@Mapper(componentModel = "spring")
public interface ISignerServiceMapper
{
    public SignerResponse fromDTO(SignerResponseDTO dto);
    public SignerResponseDTO toDTO(SignerResponse response);
}
