package com.vedang.courseapi.dto;

public record CourseResponse(
        Long id,
        String slug,
        String title,
        String description,
        int topicCount,
        int subtopicCount
) {}
