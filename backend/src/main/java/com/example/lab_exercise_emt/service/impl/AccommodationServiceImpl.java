package com.example.lab_exercise_emt.service.impl;

import com.example.lab_exercise_emt.events.NoAvailableRoom;
import com.example.lab_exercise_emt.model.Accommodation;
import com.example.lab_exercise_emt.model.Category;
import com.example.lab_exercise_emt.model.Host;
import com.example.lab_exercise_emt.model.dto.AccommodationDto;
import com.example.lab_exercise_emt.model.exceptions.InvalidAccommodationIdException;
import com.example.lab_exercise_emt.model.exceptions.InvalidHostIdException;
import com.example.lab_exercise_emt.repository.AccommodationRepository;
import com.example.lab_exercise_emt.repository.HostRepository;
import com.example.lab_exercise_emt.service.AccommodationService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    private final AccommodationRepository accommodationRepository;

    private final HostRepository hostRepository;
    private final ApplicationEventPublisher applicationEventPublisher;


    public AccommodationServiceImpl(AccommodationRepository accommodationRepository, HostRepository hostRepository, ApplicationEventPublisher applicationEventPublisher) {
        this.accommodationRepository = accommodationRepository;
        this.hostRepository = hostRepository;

        this.applicationEventPublisher = applicationEventPublisher;
    }

    @Override
    public List<Accommodation> listAll() {
        return this.accommodationRepository.findAll();
    }

    @Override
    public Accommodation findById(Long id) {
        return this.accommodationRepository.findById(id).orElseThrow(InvalidAccommodationIdException::new);
    }

    @Override
    public void deleteById(Long id) {
        this.accommodationRepository.delete(this.findById(id));
    }

    @Override
    public Accommodation create(String name, Category category, Long host, Integer numRooms) {
        Host newHost = hostRepository.findById(host).orElseThrow(InvalidHostIdException::new);
        Accommodation newAccommodation = new Accommodation(name, category, newHost, numRooms);
        return accommodationRepository.save(newAccommodation);
    }


    @Override
    public void book(Long id) {
        Accommodation acc = this.findById(id);
        if ((acc.getNumRooms()) <= 0)
            this.applicationEventPublisher.publishEvent(new NoAvailableRoom(acc));
        else {
            acc.setNumRooms(acc.getNumRooms() - 1);
            accommodationRepository.save(acc);
        }
    }


    @Override
    public Accommodation update(Long id, AccommodationDto accommodation) {
        Accommodation updateAccommodation = this.findById(id);
        updateAccommodation.setName(accommodation.getName());
        updateAccommodation.setCategory(accommodation.getCategory());
        updateAccommodation.setHost(hostRepository.findById(accommodation.getHost()).orElseThrow(InvalidHostIdException::new));
        updateAccommodation.setNumRooms(accommodation.getNumRooms());
        return accommodationRepository.save(updateAccommodation);
    }

    @Override
    public void refreshMaterializedView() {
        // TODO
    }

    @Override
    public void notAvailableAccommodation() {
        System.out.println("[ERROR]: Accommodation not available!");
    }


}
