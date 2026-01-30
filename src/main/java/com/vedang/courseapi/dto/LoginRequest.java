package com.vedang.courseapi.dto;

public record LoginRequest(
        String email,
        String password
) {
}
