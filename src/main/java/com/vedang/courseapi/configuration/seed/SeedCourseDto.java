package com.vedang.courseapi.configuration.seed;

import lombok.Data;
import java.util.List;

@Data
public class SeedCourseDto {
    private String id;
    private String title;
    private String description;
    private List<SeedTopicDto> topics;
}
