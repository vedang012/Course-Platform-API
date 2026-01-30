package com.vedang.courseapi.service;

import com.vedang.courseapi.dto.*;
import com.vedang.courseapi.model.Course;
import com.vedang.courseapi.model.Subtopic;
import com.vedang.courseapi.model.Topic;
import com.vedang.courseapi.repository.CourseRepo;
import com.vedang.courseapi.repository.SubtopicRepo;
import com.vedang.courseapi.repository.TopicRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepo courseRepo;
    private final TopicRepo topicRepo;
    private final SubtopicRepo subtopicRepo;

    public void createCourse(@RequestBody CourseRequest courseRequest) {
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
                .course(course)
                .build();

        topicRepo.save(topic);
    }

    public void createSubtopic(SubtopicRequest subtopicRequest, Long topicId) {
        Topic topic = topicRepo.findById(topicId).orElseThrow();

        Subtopic subtopic = Subtopic.builder()
                .title(subtopicRequest.title())
                .content(subtopicRequest.content())
                .build();

        subtopicRepo.save(subtopic);
    }

    public Page<CourseResponse> getAllCourses(Pageable pageable) {
        Page<Course> page = courseRepo.findAll(pageable);

        return page.map(course -> new CourseResponse(course.getId(), course.getTitle(), course.getDescription()));

    }

    public Page<TopicResponse> getTopics(Pageable pageable, Long courseId) {
        Page<Topic> page = topicRepo.findAllByCourseId(courseId, pageable);
        return page.map(topic -> new TopicResponse(topic.getId(), topic.getTitle(), topic.getCourse().getId()));
    }

    public Page<SubtopicResponse> getSubtopics(Pageable pageable, Long topicId) {
        Page<Subtopic> page = subtopicRepo.findAllByTopicId(topicId, pageable);
        return page.map(subtopic -> new SubtopicResponse(subtopic.getId(), subtopic.getTopic().getId(), subtopic.getTitle(), subtopic.getContent()));
    }
}
