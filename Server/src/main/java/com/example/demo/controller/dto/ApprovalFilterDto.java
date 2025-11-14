package com.example.demo.controller.dto;


import com.example.demo.entity.enums.E_EventStatus;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ApprovalFilterDto {
    private String search;
    private List<E_EventStatus> decisions;
    private Instant startDate;
    private Instant endDate;
}
