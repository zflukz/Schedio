package com.example.demo.controller;


import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.AdminDto;
import com.example.demo.controller.dto.ChangeRoleDto;
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
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {


    private final IUserService _userService;
    private final UserRepository _userRepository;





    public AdminController(IUserService userService, UserRepository userRepository) {
        this._userService = userService;
        this._userRepository = userRepository;
    }


    // GET /users  — ดึงผู้ใช้ทั้งหมด
    @GetMapping({"/getAll", "/users"})
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

    // GET /users/{userId} — ดึงผู้ใช้ตาม ID
    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Users>> getUserById(@PathVariable UUID userId) {
        return _userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(
                        ApiResponse.<Users>builder()
                                .success(true)
                                .message("User found")
                                .data(user)
                                .build()
                ))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        ApiResponse.<Users>builder()
                                .success(false)
                                .message("User not found")
                                .data(null)
                                .build()
                ));
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

    // POST /users/role — เปลี่ยน role ของผู้ใช้
    @PostMapping("/users/role")
    public ResponseEntity<ApiResponse<Users>> changeUserRole(@Valid @RequestBody ChangeRoleDto dto) {
        return _userRepository.findById(dto.getUserId())
                .map(user -> {
                    user.setUserRole(dto.getRole());
                    Users updatedUser = _userRepository.save(user);
                    
                    return ResponseEntity.ok(
                            ApiResponse.<Users>builder()
                                    .success(true)
                                    .message("User role updated successfully to " + dto.getRole())
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

    // DELETE /users/{userId} — ลบหรือ ban ผู้ใช้ (soft delete)
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable UUID userId) {
        return _userRepository.findById(userId)
                .map(user -> {
                    // Soft delete - could add isBanned or isDeleted field to Users entity
                    // For now, we'll actually delete
                    _userRepository.delete(user);
                    
                    return ResponseEntity.ok(
                            ApiResponse.<Void>builder()
                                    .success(true)
                                    .message("User deleted successfully")
                                    .data(null)
                                    .build()
                    );
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        ApiResponse.<Void>builder()
                                .success(false)
                                .message("User not found")
                                .data(null)
                                .build()
                ));
    }
}
