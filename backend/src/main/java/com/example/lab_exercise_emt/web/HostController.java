package com.example.lab_exercise_emt.web;

import com.example.lab_exercise_emt.model.Host;
import com.example.lab_exercise_emt.model.dto.HostDto;
import com.example.lab_exercise_emt.service.CountryService;
import com.example.lab_exercise_emt.service.HostService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hosts")
public class HostController {
    private final HostService hostService;
    private final CountryService countryService;

    public HostController(HostService hostService, CountryService countryService) {
        this.hostService = hostService;
        this.countryService = countryService;
    }

    @GetMapping
    public List<Host> findAll(){
        return hostService.listAll();
    }


    @PostMapping("/add")
    public ResponseEntity<Void> save(@RequestBody HostDto hostDTO){

        if(hostDTO == null) {
            return ResponseEntity.notFound().build();
        }

        if(countryService.findById(hostDTO.getCountry().getId()) == null) {
            return ResponseEntity.notFound().build();
        }

        this.hostService.create(hostDTO.getName(), hostDTO.getSurname(), hostDTO.getCountry().getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        this.hostService.deleteById(id);
        if (this.hostService.findById(id) != null) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

}
