package com.example.demo.controller;


import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.AdminDto;
import com.example.demo.controller.dto.CreateUserDto;
import com.example.demo.controller.dto.EditUserDto;
import com.example.demo.entity.Users;
import com.example.demo.interfaces.IUserService;
import com.example.demo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;




import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {


    private final IUserService _userService;
    private final UserRepository _userRepository;





    public AdminController(IUserService userService, UserRepository userRepository) {
        this._userService = userService;
        this._userRepository = userRepository;
    }


    // GET /users  — ดึงผู้ใช้ทั้งหมด
    @GetMapping({"/getAll"})
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


    @PostMapping("/search")
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


    @PutMapping("/edit/attendee/{userID}")
    public ResponseEntity<ApiResponse<Users>> updateUser(
            @PathVariable UUID userID,
            @Valid @RequestBody EditUserDto dto) {
    return _userRepository .findById(userID)
            .map(user -> {
                if (dto.getFirstName() != null)
                    user.setFirstName(dto.getFirstName());
                if (dto.getLastName() != null)
                    user.setLastName(dto.getLastName());
                if (dto.getUserEmail() != null)
                    user.setUserEmail(dto.getUserEmail());
                if (dto.getUserPhone() != null)
                    user.setUserPhone(dto.getUserPhone());
                if (dto.getUserRole() != null)
                    user.setUserRole(dto.getUserRole());


                Users updatedUser = _userRepository.save(user);

                return ResponseEntity.ok(
                        ApiResponse.<Users>builder()
                                .success(true)
                                .message("User updated successfully")
                                .data(updatedUser)
                                .build()
                );
            })
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    ApiResponse.<Users>builder()
                            .success(false)
                            .message("User not found")
                            .data(null)
                            .build()
            ));





    }
}
