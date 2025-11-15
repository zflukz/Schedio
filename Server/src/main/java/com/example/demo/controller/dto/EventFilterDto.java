package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_EventCategory;

import java.time.Instant;
import java.util.List;

public class EventFilterDto {
    private String search;
    private List<E_EventCategory> category;
    private Instant startDate;
    private Instant endDate;

    public EventFilterDto() {}

    public EventFilterDto(String search, List<E_EventCategory> category, Instant startDate, Instant endDate) {
        this.search = search;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public List<E_EventCategory> getCategory() {
        return category;
    }

    public void setCategory(List<E_EventCategory> category) {
        this.category = category;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }
}