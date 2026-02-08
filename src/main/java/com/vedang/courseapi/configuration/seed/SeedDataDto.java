package com.vedang.courseapi.configuration.seed;

import lombok.Data;
import java.util.List;

@Data
public class SeedDataDto {
    private List<SeedCourseDto> courses;
}
