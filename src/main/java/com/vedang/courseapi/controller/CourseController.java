package com.vedang.courseapi.controller;

import com.vedang.courseapi.dto.*;
import com.vedang.courseapi.service.CourseService;
import com.vedang.courseapi.service.CustomUserDetails;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*; 

@RestController
@RequestMapping({"/api/courses", "/api/courses/"})
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping({"", "/"})
    public void createCourse(@RequestBody CourseRequest courseRequest) {
        courseService.createCourse(courseRequest);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping({"/{id}/topics", "/{id}/topics/"})
    public void createTopic(@RequestBody TopicRequest topicRequest, @PathVariable(name = "id") Long courseId) {
        courseService.createTopic(topicRequest, courseId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping({"/topics/{topicId}/subtopics", "/topics/{topicId}/subtopics/"})
    public void createSubtopic(@RequestBody SubtopicRequest subtopicRequest, @PathVariable Long topicId) {
        courseService.createSubtopic(subtopicRequest, topicId);
    }

    @GetMapping({"", "/"})
    public Page<CourseResponse> courses(@PageableDefault(size = 10, sort = "id")
                                            @ParameterObject
                                            @Parameter(hidden = true, name = "sort")
                                            Pageable pageable) {
        return courseService.getAllCourses(pageable);
    }

    @GetMapping({"/search", "/search/"})
    public Page<CourseResponse> searchCourses(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return courseService.searchCourses(query, pageable);
    }




    @GetMapping({"/{courseId}", "/{courseId}/"})
    public CourseResponse getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }

    @GetMapping({"/{courseId}/topics", "/{courseId}/topics/"})
    public Page<TopicResponse> topics(@PageableDefault(size = 10, sort = "id")                                             @ParameterObject
                                          @Parameter(hidden = true, name = "sort")
                                          Pageable pageable, @PathVariable Long courseId) {
        return courseService.getTopics(pageable, courseId);
    }

    @GetMapping({"/topics/{topicId}", "/topics/{topicId}/"})
    public TopicResponse getTopicById(@PathVariable Long topicId) {
        return courseService.getTopicById(topicId);
    }

    @GetMapping({"/topics/{topicId}/subtopics", "/topics/{topicId}/subtopics/"})
    public Page<SubtopicSummaryResponse> subtopics(@PageableDefault(size = 10, sort = "id")                                             @ParameterObject
                                                       @Parameter(hidden = true, name = "sort")
                                                       Pageable pageable, @PathVariable Long topicId) {
        return courseService.getSubtopics(pageable, topicId);
    }

    @GetMapping({"/subtopics/{subtopicId}", "/subtopics/{subtopicId}/"})
    public SubtopicResponse getSubtopicById(@PathVariable Long subtopicId) {
        return courseService.getSubtopicById(subtopicId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping({"/{courseId}/enroll", "/{courseId}/enroll/"})
    public EnrollmentResponse enroll(@PathVariable Long courseId, @AuthenticationPrincipal CustomUserDetails user) {
        return courseService.enroll(courseId, user.getId());
    }

    @PostMapping({"/subtopics/{subtopicId}/progress", "/subtopics/{subtopicId}/progress/"})
    public ResponseEntity<?> markAsCompleted(@PathVariable Long subtopicId, @AuthenticationPrincipal CustomUserDetails user) {
        return courseService.markAsCompleted(subtopicId, user.getId());
    }

}
