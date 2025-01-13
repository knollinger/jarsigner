package rz.bankenit.jarsigner.mapper;

import org.mapstruct.Mapper;

import rz.bankenit.jarsigner.dtos.LoginRequestDTO;
import rz.bankenit.jarsigner.dtos.LoginResponseDTO;
import rz.bankenit.jarsigner.models.LoginRequest;
import rz.bankenit.jarsigner.models.LoginResponse;

@Mapper(componentModel = "spring")
public interface ISessionMapper
{
    public LoginRequest fromDTO(LoginRequestDTO dto);
    public LoginResponseDTO toDTO(LoginResponse response);
}
