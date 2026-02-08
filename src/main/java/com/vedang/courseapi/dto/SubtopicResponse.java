package com.vedang.courseapi.dto;

public record SubtopicResponse(
        Long id,
        String slug,
        Long topicId,
        String title,
        String content
) {}
