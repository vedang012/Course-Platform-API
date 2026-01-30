package com.vedang.courseapi.dto;

import lombok.NonNull;

public record CourseRequest (
        @NonNull String title,
        @NonNull String description
) {}
