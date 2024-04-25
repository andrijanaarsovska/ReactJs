package com.example.lab_exercise_emt.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Host {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String surname;

    @ManyToOne
    Country country;

    public Host(String name, String surname, Country country) {

        this.name = name;
        this.surname = surname;
        this.country = country;
    }

    public Host() {

    }
}
