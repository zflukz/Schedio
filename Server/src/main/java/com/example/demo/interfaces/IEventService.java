package com.example.demo.interfaces;

import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.controller.dto.UpdateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;

import java.util.List;
import java.util.UUID;


public interface IEventService {
    Events createEvent(CreateEventDto dto, Users currentUser);
    List<Events> getAll();
    Events getByID(UUID id);
    Events updateEventByID(UUID id, UpdateEventDto body, Users currentUser);
    void deleteEventByID(UUID id);
}
