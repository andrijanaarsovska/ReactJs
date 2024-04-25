package com.example.lab_exercise_emt.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    @Enumerated(EnumType.STRING)
    Category category;

    @ManyToOne
    Host host;

    Integer numRooms;

    public Accommodation(String name, Category category, Host host, Integer numRooms) {
        this.name = name;
        this.category = category;
        this.host = host;
        this.numRooms = numRooms;
    }

    public Accommodation() {

    }

//    public void setCategory(Category category) {
//    }
}
