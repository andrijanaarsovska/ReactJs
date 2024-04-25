package com.example.lab_exercise_emt.model.dto;

import com.example.lab_exercise_emt.model.Country;
import lombok.Data;

@Data
public class HostDto {

    String name;
    String surname;
    Country country;
}
