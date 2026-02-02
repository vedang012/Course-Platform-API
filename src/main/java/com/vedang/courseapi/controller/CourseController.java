package com.vedang.courseapi.controller;

import com.vedang.courseapi.dto.*;
import com.vedang.courseapi.model.Course;
import com.vedang.courseapi.model.Subtopic;
import com.vedang.courseapi.model.Topic;
import com.vedang.courseapi.service.CourseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
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
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping("/topics/{topicId}/subtopics")
    public void createSubtopic(@RequestBody SubtopicRequest subtopicRequest, @PathVariable Long topicId) {
        courseService.createSubtopic(subtopicRequest, topicId);
    }

    @GetMapping("/")
    public Page<CourseResponse> courses(@PageableDefault(size = 10, sort = "title") Pageable pageable) {
        return courseService.getAllCourses(pageable);
    }

    @GetMapping("/{courseId}")
    public CourseResponse getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }

    @GetMapping("/{courseId}/topics")
    public Page<TopicResponse> topics(@PageableDefault(size = 10, sort = "id") Pageable pageable, @PathVariable Long courseId) {
        return courseService.getTopics(pageable, courseId);
    }

    @GetMapping("/topics/{topicId}")
    public TopicResponse getTopicById(@PathVariable Long topicId) {
        return courseService.getTopicById(topicId);
    }

    @GetMapping("/topics/{topicId}/subtopics")
    public Page<SubtopicSummaryResponse> subtopics(@PageableDefault(size = 10, sort = "id") Pageable pageable, @PathVariable Long topicId) {
        return courseService.getSubtopics(pageable, topicId);
    }

    @GetMapping("subtopics/{subtopicId}")
    public SubtopicResponse getSubtopicById(@PathVariable Long subtopicId) {
        return courseService.getSubtopicById(subtopicId);
    }

}
