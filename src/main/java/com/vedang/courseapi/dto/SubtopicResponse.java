package com.vedang.courseapi.dto;

public record SubtopicResponse(
        Long id,
        Long topicId,
        String title,
        String content
) {

}
