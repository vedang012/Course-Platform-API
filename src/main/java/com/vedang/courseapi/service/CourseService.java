package com.vedang.courseapi.service;

import com.vedang.courseapi.dto.*;
import com.vedang.courseapi.model.*;
import com.vedang.courseapi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepo courseRepo;
    private final TopicRepo topicRepo;
    private final SubtopicRepo subtopicRepo;
    private final UserRepo userRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final SubtopicProgressRepo subtopicProgressRepo;

    public void createCourse(CourseRequest courseRequest) {
        Course course = Course.builder()
                .title(courseRequest.title())
                .description(courseRequest.description())
                .build();

        courseRepo.save(course);
    }

    public void createTopic(TopicRequest topicRequest, Long courseId) {
        Course course = courseRepo.findById(courseId).orElseThrow();
        Topic topic = Topic.builder()
                .title(topicRequest.title())
                .build();

        course.addTopic(topic);
        topicRepo.save(topic);
    }

    public void createSubtopic(SubtopicRequest subtopicRequest, Long topicId) {

        Topic topic = topicRepo.findById(topicId).orElseThrow();

        Subtopic subtopic = Subtopic.builder()
                .title(subtopicRequest.title())
                .content(subtopicRequest.content())
                .build();

        topic.addSubtopic(subtopic);
        subtopicRepo.save(subtopic);
    }

    public Page<CourseResponse> getAllCourses(Pageable pageable) {
        Page<Course> page = courseRepo.findAll(pageable);

        return page.map(course -> new CourseResponse(course.getId(), course.getTitle(), course.getDescription(), course.getTopics().size(), course.getTopics()
                .stream()
                .mapToInt(topic -> topic.getSubtopics().size())
                .sum()
));

    }

    public Page<TopicResponse> getTopics(Pageable pageable, Long courseId) {
        Page<Topic> page = topicRepo.findAllByCourseId(courseId, pageable);
        return page.map(topic -> new TopicResponse(topic.getId(), topic.getTitle(), topic.getCourse().getId()));
    }

    public Page<SubtopicSummaryResponse> getSubtopics(Pageable pageable, Long topicId) {
        Page<Subtopic> page = subtopicRepo.findAllByTopicId(topicId, pageable);
        return page.map(subtopic -> new SubtopicSummaryResponse(subtopic.getId(), subtopic.getTopic().getId(), subtopic.getTitle()));
    }

    public CourseResponse getCourseById(Long courseId) {
        Course course = courseRepo.findById(courseId).orElseThrow();
        int topicCount = course.getTopics().size();
        int subtopicCount = course.getTopics()
                .stream()
                .mapToInt(topic -> topic.getSubtopics().size())
                .sum();
        return new CourseResponse(course.getId(), course.getTitle(), course.getDescription(), topicCount, subtopicCount);
    }

    public TopicResponse getTopicById(Long topicId) {
        Topic topic = topicRepo.findById(topicId).orElseThrow();
        return new TopicResponse(topic.getId(), topic.getTitle(), topic.getCourse().getId());
    }


    public SubtopicResponse getSubtopicById(Long subtopicId) {
        Subtopic subtopic = subtopicRepo.findById(subtopicId).orElseThrow();
        return new SubtopicResponse(subtopic.getId(), subtopic.getTopic().getId(), subtopic.getTitle(), subtopic.getContent());
    }

    public EnrollmentResponse enroll(Long courseId, Long userid) {
        User user = userRepo.findById(userid).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();
        Enrollment enrollment = Enrollment.builder()
                .course(course)
                .user(user)
                .build();
        enrollmentRepo.save(enrollment);
        return new EnrollmentResponse(user.getId(), course.getId(), "Enrolled Successfully");
    }

    public ResponseEntity<?> markAsCompleted(Long subtopicId, Long userId) {
        SubtopicProgress subtopicProgress = SubtopicProgress.builder()
                .user(userRepo.getReferenceById(userId))
                .subtopic(subtopicRepo.getReferenceById(subtopicId))
                .completedAt(new Date())
                .build();

        subtopicProgressRepo.save(subtopicProgress);
        return ResponseEntity.ok("success");
    }
}
