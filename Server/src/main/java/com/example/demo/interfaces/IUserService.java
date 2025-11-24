package com.example.demo.interfaces;

import com.example.demo.controller.dto.CreateUserDto;

import com.example.demo.controller.dto.EditUserDto;
import com.example.demo.entity.Users;

import java.util.List;
import java.util.UUID;

public interface IUserService {

    Users createUser(CreateUserDto body);
    List<Users> getAll();
    Users getByID(UUID id);
    Users updateUserByID(UUID id, CreateUserDto body);
    void deleteUserByID(UUID id);
    Users findByGoogleID(String googleID);
    Users editUserByID (UUID id , EditUserDto body);





}
