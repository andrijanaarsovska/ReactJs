package com.example.lab_exercise_emt.listeners;


import com.example.lab_exercise_emt.events.NoAvailableRoom;
import com.example.lab_exercise_emt.service.AccommodationService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class AccommodationEventHandler {
    private final AccommodationService accommodationService;

    public AccommodationEventHandler(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @EventListener
    public void noAvailableRoom(NoAvailableRoom event){
        this.accommodationService.notAvailableAccommodation();
    }
}
