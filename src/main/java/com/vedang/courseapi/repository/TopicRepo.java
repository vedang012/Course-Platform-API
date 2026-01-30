package com.vedang.courseapi.repository;

import com.vedang.courseapi.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepo extends JpaRepository<Topic, Long> {
    Page<Topic> findAllByCourseId(Long courseId, Pageable pageable);
}
