package com.example.lab_exercise_emt.web;


import com.example.lab_exercise_emt.model.Accommodation;
import com.example.lab_exercise_emt.model.Category;
import com.example.lab_exercise_emt.model.dto.AccommodationDto;
import com.example.lab_exercise_emt.service.AccommodationService;
import com.example.lab_exercise_emt.service.HostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/accommodations")
public class AccommodationController {


    private final AccommodationService accommodationService;
    private final HostService hostService;

    public AccommodationController(AccommodationService accommodationService, HostService hostService) {
        this.accommodationService = accommodationService;
        this.hostService = hostService;
    }


    @GetMapping
    public List<Accommodation> findAll() {
        return accommodationService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accommodation> findById(@PathVariable Long id) {
        Accommodation accommodation = this.accommodationService.findById(id);
        if (accommodation != null) {
            return ResponseEntity.ok().body(accommodation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping({"/categories"})
    public List<Category> getTypes() {
        return List.of(Category.values());
    }


    @PostMapping({"/add-accommodation"})
    public ResponseEntity<Void> addAccommodation(@RequestBody AccommodationDto accommodationDTO) {
        if (accommodationDTO == null) {
            return ResponseEntity.notFound().build();
        }

        if (hostService.findById(accommodationDTO.getHost()) == null) {
            return ResponseEntity.notFound().build();

        }

        accommodationService.create(accommodationDTO.getName(), accommodationDTO.getCategory(), accommodationDTO.getHost(), accommodationDTO.getNumRooms());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping({"/delete-accommodation/{id}"})
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.notFound().build();
        }

        if (accommodationService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }

        accommodationService.deleteById(id);

        return ResponseEntity.ok().build();
    }

    @PostMapping({"/edit/{id}"})
    public ResponseEntity<Accommodation> edit(@PathVariable Long id, @RequestBody AccommodationDto accommodationDTO) {

        if (accommodationDTO == null) {
            return ResponseEntity.notFound().build();
        }

        if (accommodationService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }

        this.accommodationService.update(id, accommodationDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping({"/book/{id}"})
    public void book(@PathVariable Long id) {
        accommodationService.book(id);
    }
}