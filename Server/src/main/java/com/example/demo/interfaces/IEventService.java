package com.example.demo.interfaces;

import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.entity.Events;
import java.util.List;
import java.util.UUID;


public interface IEventService {
    Events createEvent(CreateEventDto dto);
    List<Events> getAll();
    Events getByID(UUID id);
    Events updateEventByID(UUID id, CreateEventDto body);
    void deleteEventByID(UUID id);
}
