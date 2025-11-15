package com.example.demo.controller.dto;


import jakarta.validation.constraints.NotBlank;

import lombok.Data;


public class LoginRequestDto {


    @NotBlank(message = "Username or email is required")
    public String usernameOrEmail;

    @NotBlank(message = "Password is required")
    public String userPassword;

    public LoginRequestDto(String usernameOrEmail, String userPassword){
        this.usernameOrEmail = usernameOrEmail;
        this.userPassword = userPassword;
    }

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

}
