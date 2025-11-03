package com.example.demo.controller;


import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.CreateUserDto;
import com.example.demo.entity.Users;
import com.example.demo.interfaces.IUserService;
import com.example.demo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




import java.util.List;

@RestController
@RequestMapping("/api/attendee")
//@Tag(name= "User")
public class UserController {


    private final IUserService _userService;
    private final UserRepository _userRepository;





    public UserController(IUserService userService, UserRepository userRepository) {
        this._userService = userService;
        this._userRepository = userRepository;
    }


    // POST /attendee/search
    @PostMapping("/search")
    public ResponseEntity<ApiResponse<Users>> findEmail(@Valid @RequestBody CreateUserDto dto) {
        return _userRepository.findByUserEmail(dto.getUserEmail())
                .map(user -> ResponseEntity.ok(
                        ApiResponse.<Users>builder()
                                .success(true)
                                .message("User found")
                                .data(user)
                                .build()
                ))
                .orElse(ResponseEntity.status(404).body(
                        ApiResponse.<Users>builder()
                                .success(false)
                                .message("User not found")
                                .data(null)
                                .build()
                ));
    }


    @PostMapping({"","/"})
    public ResponseEntity<ApiResponse<Users>> createUser(@Valid @RequestBody CreateUserDto dto){
        Users newUser = _userService.createUser(dto);
        return ResponseEntity.ok(
                ApiResponse.<Users>builder()
                        .success(true)
                        .message("User create success")
                        .data(newUser)
                        .build()
        );
    }





}
