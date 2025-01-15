package org.knollinger.jarsigner.mapper;

import org.knollinger.jarsigner.dtos.LoginRequestDTO;
import org.knollinger.jarsigner.dtos.LoginResponseDTO;
import org.knollinger.jarsigner.models.LoginRequest;
import org.knollinger.jarsigner.models.LoginResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ISessionMapper
{
    public LoginRequest fromDTO(LoginRequestDTO dto);
    public LoginResponseDTO toDTO(LoginResponse response);
}
