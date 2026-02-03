package com.vedang.courseapi.repository;

import com.vedang.courseapi.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long> {
}
