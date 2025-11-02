package com.example.demo.controller;


import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.AdminDto;
import com.example.demo.controller.dto.CreateUserDto;
import com.example.demo.entity.Users;
import com.example.demo.interfaces.IUserService;
import com.example.demo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;




import java.util.List;

@RestController
@RequestMapping("/")
public class AdminController {


    private final IUserService _userService;
    private final UserRepository _userRepository;





    public AdminController(IUserService userService, UserRepository userRepository) {
        this._userService = userService;
        this._userRepository = userRepository;
    }


    // GET /users  — ดึงผู้ใช้ทั้งหมด
    @GetMapping({"/api/admin/getAll"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Users>>> getAll() {
        List<Users> users = _userService.getAll();
        return ResponseEntity.ok(
                ApiResponse.<List<Users>>builder()
                        .success(true)
                        .message("Fetch users success")
                        .data(users)
                        .build()
        );
    }


    @PostMapping("api/admin/search")
    public ResponseEntity<ApiResponse<Users>> findEmail(@Valid @RequestBody AdminDto dto) {
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




}
