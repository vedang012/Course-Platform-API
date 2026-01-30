package com.vedang.courseapi.service;

import com.vedang.courseapi.dto.CourseRequest;
import com.vedang.courseapi.dto.SubtopicRequest;
import com.vedang.courseapi.dto.TopicRequest;
import com.vedang.courseapi.model.Course;
import com.vedang.courseapi.model.Subtopic;
import com.vedang.courseapi.model.Topic;
import com.vedang.courseapi.repository.CourseRepo;
import com.vedang.courseapi.repository.SubtopicRepo;
import com.vedang.courseapi.repository.TopicRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
}
