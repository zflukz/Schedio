package com.example.demo.entity;

import com.example.demo.entity.enums.E_Role;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(
        name = "users",
        indexes = {
                @Index(name = "idx_users_role", columnList = "role"),
                @Index(name = "idx_users_googleid", columnList = "GoogleID")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_users_email", columnNames = "email"),
                @UniqueConstraint(name = "uk_users_googleid", columnNames = "GoogleID")
        }
)

public class Users {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id", updatable = false)
    private UUID userID;

    @Column(name="username", length = 100) // nullable = true
    private String userName;

    @JsonIgnore
    @Column(name="password", length = 100) // nullable = true
    private String userPassword;

    @Column(name="firstname", length = 100)
    private String firstName;

    @Column(name = "lastname", length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    @Builder.Default
    private E_Role userRole = E_Role.ATTENDEE;

    @Column(name ="phone", length = 20)
    private String userPhone;

    @Column(name = "GoogleID")
    private String googleID;







    public Users(String userName, String userPassword, String userEmail){
        this.userName = userName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
    }
    public UUID getUserID(){
        return userID;
    }


    public String getUserEmail() {
        return userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserPassword() {
        return userPassword;
    }



}
