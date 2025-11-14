package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_EventStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ApprovalRequestDto {

    @NotNull(message = "Decision is required")
    private E_EventStatus decision;

    private String comment;
}
