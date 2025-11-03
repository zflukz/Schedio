package com.example.demo.service;

import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.entity.enums.E_EventCategory;
import com.example.demo.interfaces.IEventService;
import com.example.demo.repository.EventRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventService implements IEventService {
    
    @Autowired private EventRepository _eventRepository;

    @Transactional
    public Events createEvent(CreateEventDto body) {
        Events newEvent = new Events();
        newEvent.setTitle(body.getTitle());
        //newEvent.setLocation(body.getLocation());
        newEvent.setEventBy(body.getEventBy());
        newEvent.setEventContact(body.getEventContact());
        newEvent.setDescription(body.getDescription());
        newEvent.setStartsAt(body.getStartsAt());
        newEvent.setEndsAt(body.getEndsAt());
        newEvent.setEventCategory(body.getEventCategory());
        newEvent.setCapacity(body.getCapacity());
        newEvent.setWalkIn(body.getWalkIn());
        // newEvent.setActivityHours(body.getActivityHours());
        newEvent.setPoster(body.getPoster());
        newEvent.setFilePdf(body.getFilePdf());
        newEvent.setStatus(body.getStatus());
        return _eventRepository.save(newEvent);
    }

    public List<Events> getAll(){
        return _eventRepository.findAll();
    }

    public Events getByID(UUID id){
        return _eventRepository.findById(id).orElseThrow(()-> new RuntimeException("Event not found"));
    }

    @Transactional
    public Events updateEventByID(UUID id , CreateEventDto body){
        Events event = _eventRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("Event not found"));
        event.setTitle(body.getTitle());
        //event.setLocation(body.getLocation());
        event.setEventBy(body.getEventBy());
        event.setEventContact(body.getEventContact());
        event.setDescription(body.getDescription());
        event.setStartsAt(body.getStartsAt());
        event.setEndsAt(body.getEndsAt());
        event.setEventCategory(body.getEventCategory());
        event.setCapacity(body.getCapacity());
        event.setWalkIn(body.getWalkIn());
        // event.setActivityHours(body.getActivityHours());
        event.setPoster(body.getPoster());
        event.setFilePdf(body.getFilePdf());
        event.setStatus(body.getStatus());
        return _eventRepository.save(event);
    }

    @Transactional
    public void deleteEventByID(UUID id) {
        Events event = _eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        _eventRepository.delete(event);
    }
}
