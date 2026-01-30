package com.vedang.courseapi.repository;

import com.vedang.courseapi.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course, Long> {

}
