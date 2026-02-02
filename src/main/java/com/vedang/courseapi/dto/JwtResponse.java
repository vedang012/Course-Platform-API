package com.vedang.courseapi.dto;

import java.util.Date;

public record JwtResponse(
        String token,
        String email,
        Date expiresIn
) {
}
