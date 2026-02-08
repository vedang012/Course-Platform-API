package com.vedang.courseapi.dto;

public record TopicResponse(
        Long id,
        String slug,
        String title,
        Long courseId
) {

}
