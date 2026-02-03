package com.vedang.courseapi.dto;

public record EnrollmentResponse(
        Long userId,
        Long courseId,
        String message
) {

}
