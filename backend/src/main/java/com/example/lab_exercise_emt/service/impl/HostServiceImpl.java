package com.example.lab_exercise_emt.service.impl;

import com.example.lab_exercise_emt.model.Country;
import com.example.lab_exercise_emt.model.Host;
import com.example.lab_exercise_emt.model.exceptions.InvalidCountryIdException;
import com.example.lab_exercise_emt.model.exceptions.InvalidHostIdException;
import com.example.lab_exercise_emt.repository.CountryRepository;
import com.example.lab_exercise_emt.repository.HostRepository;
import com.example.lab_exercise_emt.service.HostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostServiceImpl implements HostService {

    private final HostRepository hostRepository;

    private final CountryRepository countryRepository;

    public HostServiceImpl(HostRepository hostRepository, CountryRepository countryRepository) {
        this.hostRepository = hostRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Host> listAll() {
        return hostRepository.findAll();
    }

    @Override
    public Host findById(Long id) {
        return hostRepository.findById(id).orElseThrow(InvalidHostIdException::new);
    }

    @Override
    public void deleteById(Long id) {
        Host hostDelete = this.findById(id);
        hostRepository.delete(hostDelete);
    }

    @Override
    public Host create(String name, String surname, Long countryId) {
        Country country = this.countryRepository.findById(countryId).orElseThrow(InvalidCountryIdException::new);
        Host newHost = new Host(name, surname, country);
        return this.hostRepository.save(newHost);
    }

    @Override
    public Host update(Long id, String name, String surname, Long countryId) {
        Country country = this.countryRepository.findById(countryId).orElseThrow(InvalidCountryIdException::new);
        Host newHost = this.findById(id);
        newHost.setName(name);
        newHost.setSurname(surname);
        newHost.setCountry(country);
        return hostRepository.save(newHost);
    }
}
