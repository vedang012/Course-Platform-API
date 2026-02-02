package com.vedang.courseapi.dto;

public record RegisterResponse(
        Long id,
        String email,
        String role,
        String message
) {

}
