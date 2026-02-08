package com.vedang.courseapi.configuration.seed;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vedang.courseapi.model.Course;
import com.vedang.courseapi.model.Topic;
import com.vedang.courseapi.model.Subtopic;
import com.vedang.courseapi.repository.CourseRepo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
@RequiredArgsConstructor
public class Seeder {

    private final CourseRepo courseRepository;
    private final ObjectMapper objectMapper;

    @PostConstruct
    public void seed() {
        try {
            if (courseRepository.count() > 0) {
                System.out.println("Seed data already exists. Skipping...");
                return;
            }

            InputStream is = new ClassPathResource("seed_data/courses.json").getInputStream();
            SeedDataDto seedData = objectMapper.readValue(is, SeedDataDto.class);

            for (SeedCourseDto c : seedData.getCourses()) {

                Course course = Course.builder()
                        .slug(c.getId())
                        .title(c.getTitle())
                        .description(c.getDescription())
                        .build();

                for (SeedTopicDto t : c.getTopics()) {

                    Topic topic = Topic.builder()
                            .slug(t.getId())
                            .title(t.getTitle())
                            .build();

                    for (SeedSubtopicDto s : t.getSubtopics()) {

                        Subtopic sub = Subtopic.builder()
                                .slug(s.getId())
                                .title(s.getTitle())
                                .content(s.getContent())
                                .build();

                        topic.addSubtopic(sub); // sets topic
                    }

                    course.addTopic(topic); // sets course
                }

                courseRepository.save(course); // cascade saves topics + subtopics
            }

            System.out.println("Seed data loaded successfully.");

        } catch (Exception e) {
            throw new RuntimeException("Failed to seed database", e);
        }
    }
}
