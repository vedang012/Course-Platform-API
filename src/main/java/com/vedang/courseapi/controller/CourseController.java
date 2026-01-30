package com.vedang.courseapi.controller;

import com.vedang.courseapi.dto.CourseRequest;
import com.vedang.courseapi.dto.SubtopicRequest;
import com.vedang.courseapi.dto.TopicRequest;
import com.vedang.courseapi.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/")
    public void createCourse(@RequestBody CourseRequest courseRequest) {
        courseService.createCourse(courseRequest);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/topics")
    public void createTopic(@RequestBody TopicRequest topicRequest, @PathVariable(name = "id") Long courseId) {
        courseService.createTopic(topicRequest, courseId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/topics/{topicId}/subtopics")
    public void createSubtopic(@RequestBody SubtopicRequest subtopicRequest, @PathVariable Long topicId) {
        courseService.createSubtopic(subtopicRequest, topicId);
    }

}
