package com.vedang.courseapi.configuration.seed;

import lombok.Data;
import java.util.List;

@Data
public class SeedTopicDto {
    private String id;
    private String title;
    private List<SeedSubtopicDto> subtopics;
}
