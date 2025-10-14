package com.example.demo.controller.dto;


import jakarta.validation.constraints.NotBlank;

import lombok.Data;


public class LoginRequestDto {


    @NotBlank(message = "username is require")
    public String userName;

    @NotBlank(message = "password is require")
    public String userPassword;

    public LoginRequestDto(String userName, String userPassword){
        this.userName = userName;
        this.userPassword = userPassword;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

}
