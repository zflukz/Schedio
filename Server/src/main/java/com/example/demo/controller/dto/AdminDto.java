package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class AdminDto {

    private UUID userID;
    private String userName;
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String userPassword;
    private String firstName;
    private String lastName;
    @Email(message = "Invalid email format")
    private String userEmail;
    private String userPhone;
}
