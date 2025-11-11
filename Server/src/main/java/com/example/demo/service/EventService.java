package com.example.demo.service;

import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.controller.dto.UpdateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
//import com.example.demo.entity.enums.E_EventCategory;
//import com.example.demo.entity.enums.E_EventStatus;
//import com.example.demo.entity.enums.E_Role;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.interfaces.IEventService;
import com.example.demo.repository.EventRepository;
//import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
//import java.util.Set;
import java.util.UUID;

@Service
public class EventService implements IEventService {

    @Autowired
    private EventRepository _eventRepository;

    @Override
    @Transactional
    public Events createEvent(CreateEventDto body, Users currentUser) {

        boolean isOrganizer = currentUser.getUserRole() == E_Role.ORGANIZER;
        if (!isOrganizer) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only organizer can create events");
        }

        Events newEvent = new Events();

        newEvent.setTitle(body.getTitle());
        newEvent.setLocation(body.getLocation());
        newEvent.setEventBy(body.getEventBy());
        newEvent.setEventContact(body.getEventContact());
        newEvent.setDescription(body.getDescription());
        newEvent.setStartsAt(body.getStartsAt());
        newEvent.setEndsAt(body.getEndsAt());
        newEvent.setEventCategory(body.getEventCategory());
        newEvent.setCapacity(body.getCapacity() != null ? body.getCapacity() : Integer.MAX_VALUE);
        newEvent.setWalkIn(body.getWalkIn());
        newEvent.setActivityHour(body.getActivityHour());
        newEvent.setPoster(body.getPoster());
        newEvent.setFilePdf(body.getFilePdf());
        newEvent.setStatus(body.getStatus());

        //Auto-fill organizer info
        String fullName =
                (currentUser.getFirstName() != null ? currentUser.getFirstName() : "") + " " + (currentUser.getLastName() != null ? currentUser.getLastName() : "");
        newEvent.setEventBy(fullName.trim());

        newEvent.setEventContact(
                currentUser.getUserEmail() != null ? currentUser.getUserEmail() : "unknown"
        );

        //รองรับหลาย organizer ต่อ event
//        currentUser.getEvents().add(newEvent);
//        _userRepository.save(currentUser);


        return _eventRepository.save(newEvent);
    }

    @Override
    public List<Events> getAll(){
        return _eventRepository.findAll();
    }

    @Override
    public Events getByID(UUID id){
        return _eventRepository.findById(id).orElseThrow(()-> new RuntimeException("Event not found"));
    }

    @Override
    @Transactional
    public Events updateEventByID(UUID id, UpdateEventDto body, Users currentUser) {
        Events event = _eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        boolean isAdmin = currentUser.getUserRole() == E_Role.ADMIN;
        boolean isOrganizer = currentUser.getUserRole() == E_Role.ORGANIZER;

        if(!isAdmin && !isOrganizer) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not allowed to edit events.");

        }

        if(isOrganizer) {
            event.setEditRequested(true);
            return _eventRepository.save(event);
        }

        //Optional update
        if (body.getTitle() != null) event.setTitle(body.getTitle());
        if (body.getLocation() != null) event.setLocation(body.getLocation());
        if (body.getEventBy() != null) event.setEventBy(body.getEventBy());
        if (body.getEventContact() != null) event.setEventContact(body.getEventContact());
        if (body.getDescription() != null) event.setDescription(body.getDescription());
        if (body.getStartsAt() != null) event.setStartsAt(body.getStartsAt());
        if (body.getEndsAt() != null) event.setEndsAt(body.getEndsAt());
        if (body.getEventCategory() != null) event.setEventCategory(body.getEventCategory());
        if (body.getCapacity() != null) event.setCapacity(body.getCapacity());
        if (body.getWalkIn() != null) event.setWalkIn(body.getWalkIn());
        if (body.getActivityHour() != null) event.setActivityHour(body.getActivityHour());
        if (body.getPoster() != null) event.setPoster(body.getPoster());
        if (body.getFilePdf() != null) event.setFilePdf(body.getFilePdf());
        if (body.getStatus() != null) event.setStatus(body.getStatus());

        //When admin edited
        event.setEditRequested(false);

        return _eventRepository.save(event);
    }

    @Override
    @Transactional
    public void deleteEventByID(UUID id) {
        Events event = _eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        _eventRepository.delete(event);
    }
}
