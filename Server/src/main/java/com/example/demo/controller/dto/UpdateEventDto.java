package com.example.demo.controller.dto;
import lombok.Data;
import com.example.demo.entity.enums.E_EventCategory;
import com.example.demo.entity.enums.E_EventStatus;
import java.time.Instant;

@Data
public class UpdateEventDto {
    private String title;
    private String description;
    private String location;
    private Integer activityHour;
    private String eventBy;
    private String eventContactEmail;
    private String eventContactPhone;
    private Instant startsAt;
    private Instant endsAt;
    private E_EventCategory eventCategory;
    private Integer capacity;
    private Boolean walkIn;
    private String poster;
    private String filePdf;

    // ถ้า admin จะเปลี่ยนเป็นสถานะนี้ตอน update
    private E_EventStatus status;
}
