package com.vedang.courseapi.repository;

import com.vedang.courseapi.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepo extends JpaRepository<Topic, Long> {
}
