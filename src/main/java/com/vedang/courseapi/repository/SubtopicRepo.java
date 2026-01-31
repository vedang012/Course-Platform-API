package com.vedang.courseapi.repository;

import com.vedang.courseapi.model.Subtopic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubtopicRepo extends JpaRepository<Subtopic, Long> {
    Page<Subtopic> findAllByTopicId(Long topicId, Pageable pageable);

    @Query("""
       SELECT COUNT(s)
       FROM Subtopic s
       WHERE s.topic.course.id = :courseId
       """)
    int countByCourseId(Long courseId);

    int countByTopicId(Long topicId);

}
