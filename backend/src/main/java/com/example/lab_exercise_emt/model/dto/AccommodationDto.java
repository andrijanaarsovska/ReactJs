package com.example.lab_exercise_emt.model.dto;

import com.example.lab_exercise_emt.model.Category;
import com.example.lab_exercise_emt.model.Host;
import lombok.Data;

@Data
public class AccommodationDto {


    String name;

    Category category;

    Long host;

    Integer numRooms;

}
