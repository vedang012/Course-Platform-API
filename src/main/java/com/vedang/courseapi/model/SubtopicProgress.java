package com.vedang.courseapi.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

// a progress should be stored at once only.. as the user can complete a subtopic multiple times.
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "subtopic_id"})
)
public class SubtopicProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subtopic_id")
    private Subtopic subtopic;

    private Date completedAt;
}
