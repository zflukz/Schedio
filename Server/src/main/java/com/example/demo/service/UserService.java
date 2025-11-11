package com.example.demo.service;


import com.example.demo.controller.dto.CreateUserDto;
import com.example.demo.entity.Users;
import com.example.demo.interfaces.IUserService;

import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;


@Service
public class UserService implements IUserService {

    @Autowired private UserRepository _userRepository;


    @Override
    @Transactional
    public Users createUser(CreateUserDto body) {
        Users newUser = new Users();
        newUser.setUserName(body.getUserName());
        newUser.setUserPassword(body.getUserPassword());
        newUser.setFirstName(body.getFirstName());
        newUser.setLastName(body.getLastName());
        newUser.setUserEmail(body.getUserEmail());
        newUser.setUserPhone(body.getUserPhone());
        newUser.setUserRole(body.getUserRole());
        return _userRepository.save(newUser);
    }



    public List<Users> getAll(){
        return _userRepository.findAll();
    }


    public Users getByID(UUID id){
        return _userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
    }


    @Transactional
    public Users updateUserByID(UUID id , CreateUserDto body){
        Users user = _userRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("User not found"));
        user.setUserPassword(body.getUserPassword());
        user.setFirstName(body.getFirstName());
        user.setLastName(body.getLastName());
        user.setUserEmail(body.getUserEmail());
        user.setUserPhone(body.getUserPhone());
        user.setUserRole(body.getUserRole());
        return _userRepository.save(user);

    }

    @Transactional
    public void deleteUserByID(UUID id) {
        Users user = _userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        _userRepository.delete(user);
    }







}
