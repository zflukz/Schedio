package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "event_registration",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_event_registration_user_event",
                columnNames = {"user_id","event_id"}
        ),
        indexes = {
                @Index(name = "idx_reg_event", columnList = "event_id"),
                @Index(name = "idx_reg_user",  columnList = "user_id")
        })
public class EventRegisters {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "reg_id", nullable = false, updatable = false)
    private UUID regId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_reg_user"))
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="event_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_reg_event"))
    private Events event;



    @Column(name="registered_at", nullable = false)
    private Instant registeredAt;

    @PrePersist
    void onCreate() {
        if (registeredAt == null) registeredAt = Instant.now();
    }
}
