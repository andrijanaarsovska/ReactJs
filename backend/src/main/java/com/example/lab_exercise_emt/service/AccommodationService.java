package com.example.lab_exercise_emt.service;

import com.example.lab_exercise_emt.model.Accommodation;
import com.example.lab_exercise_emt.model.Category;
import com.example.lab_exercise_emt.model.Host;
import com.example.lab_exercise_emt.model.dto.AccommodationDto;

import java.util.List;

public interface AccommodationService {

    List<Accommodation> listAll();

    Accommodation findById(Long id);

    void deleteById(Long id);

    Accommodation create(String name, Category category, Long host, Integer numRooms);

    void book(Long id);

    Accommodation update(Long id, AccommodationDto dto);

    void refreshMaterializedView();

    void notAvailableAccommodation();

        //    void mark(Long id);
  ;
}
