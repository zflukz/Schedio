// GoogleUserService.java
package com.example.demo.service;

import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

@Service
@RequiredArgsConstructor
public class GoogleUserService {

    private final UserRepository userRepository;

    @Transactional
    public Users upsertFromGoogle(OidcUser oidc) {
        // ดึงข้อมูลหลักจาก OIDC
        String sub        = oidc.getSubject();                     // Google ID
        String email      = oidc.getEmail();                       // อาจเป็น null ถ้าผู้ใช้ซ่อน
        String name       = oidc.getFullName();                    // display name
        String givenName  = (String) oidc.getClaims().get("given_name");
        String familyName = (String) oidc.getClaims().get("family_name");
        String picture    = oidc.getPicture();
        Boolean verified  = (Boolean) oidc.getClaims().getOrDefault("email_verified", false);

        // กรณี production: คุณอาจบังคับให้ email ต้อง verified
        if (!Boolean.TRUE.equals(verified)) {
            // ตัดสินใจเองว่าจะ block หรืออนุญาตแบบ warning
            // throw new IllegalStateException("Email is not verified");
        }

        // 1) หาโดย googleId ก่อน
        Users user = userRepository.findByGoogleID(sub)
                .orElseGet(() ->
                        // 2) ถ้ายังไม่เคย map googleId แต่เคยมี email เดิม → ผูกเข้าด้วยกัน
                        (StringUtils.hasText(email)
                                ? userRepository.findByUserEmail(email).orElse(null)
                                : null)
                );

        if (user == null) {
            // ผู้ใช้ใหม่
            user = Users.builder()
                    .googleID(sub)
                    .userEmail(email)
                    .userName(name)
                    .firstName(givenName)
                    .lastName(familyName)
                    .userRole(E_Role.ATTENDEE)
                    .userPhone(null)
                    .build();
        } else {
            // อัปเดตข้อมูลล่าสุด
            user.setGoogleID(sub); // ผูก googleId หากเพิ่งเจอครั้งแรก
            if (user.getUserEmail() == null) user.setUserEmail(email);
            if (user.getUserName() == null || !user.getUserName().equals(name)) user.setUserName(name);
            user.setFirstName(givenName);
            user.setLastName(familyName);
            //user.setAvatarUrl(picture);
        }

        System.out.println("[OAUTH] saved user complete ");
        return userRepository.save(user);
    }
}
