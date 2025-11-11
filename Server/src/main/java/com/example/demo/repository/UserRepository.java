package com.example.demo.repository;

import com.example.demo.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Optional<Users> findByUserEmail(String userEmail);
    Optional<Users> findByUserName(String userName);
    boolean existsByUserEmail(String email);


}
