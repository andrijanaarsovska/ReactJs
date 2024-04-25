package com.example.lab_exercise_emt.service.impl;

import com.example.lab_exercise_emt.model.Country;
import com.example.lab_exercise_emt.model.exceptions.InvalidCountryIdException;
import com.example.lab_exercise_emt.repository.CountryRepository;
import com.example.lab_exercise_emt.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> listAll() {
        return this.countryRepository.findAll();
    }

    @Override
    public Country findById(Long id) {
        return this.countryRepository.findById(id).orElseThrow(InvalidCountryIdException::new);
    }

    @Override
    public void deleteById(Long id) {
        Country country = this.findById(id);
        this.countryRepository.delete(country);
    }

    @Override
    public Country create(String name, String continent) {
        return this.countryRepository.save(new Country(name, continent));
    }

    @Override
    public Country update(Long id, String name, String continent) {
        Country country = this.findById(id);
        country.setName(name);
        country.setContinent(continent);

        return this.countryRepository.save(country);
    }
}
