package com.vedang.courseapi.repository;

import com.vedang.courseapi.dto.CourseResponse;
import com.vedang.courseapi.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseRepo extends JpaRepository<Course, Long> {

    @Query("""
    SELECT DISTINCT c FROM Course c
    LEFT JOIN c.topics t
    LEFT JOIN t.subtopics s
    WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(c.description) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(s.content) LIKE LOWER(CONCAT('%', :query, '%'))
""")
    Page<Course> searchCourses(@Param("query") String query, Pageable pageable);


}
