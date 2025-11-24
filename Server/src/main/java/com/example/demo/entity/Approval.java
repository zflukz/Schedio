package com.example.demo.entity;

import com.example.demo.entity.enums.E_EventStatus;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "approval")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Approval {

    @Id
    @GeneratedValue
    @Column(name = "approvalID", columnDefinition = "uuid")
    private UUID approvalID;

    @ManyToOne
    @JoinColumn(name = "eventID", nullable = false)
    private Events event;

    @ManyToOne
    @JoinColumn(name = "adminID")
    private Users admin;

    @Enumerated(EnumType.STRING)
    @Column(name = "decision", nullable = false)
    private E_EventStatus decision;

    @Column(name = "comment")
    private String comment;

    @Column(name = "decided_at")
    private Instant decidedAt;


}
