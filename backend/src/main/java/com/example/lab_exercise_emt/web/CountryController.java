package com.example.lab_exercise_emt.web;

import com.example.lab_exercise_emt.model.Country;
import com.example.lab_exercise_emt.model.dto.CountryDto;
import com.example.lab_exercise_emt.service.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/countries")
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<Country> getCountries(){
        return this.countryService.listAll();
    }

    @PostMapping("/add-country")
    public ResponseEntity<Void> addCountry(@RequestBody CountryDto countryDTO){
        if(countryDTO == null){
            return ResponseEntity.notFound().build();
        }
        this.countryService.create(countryDTO.getName(), countryDTO.getContinent());
        return ResponseEntity.ok().build();
    }
}

