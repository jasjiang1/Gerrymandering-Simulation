package com.grizzlies.cse416;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrecinctService {
    
    @Autowired
    private NJ_Precinct_Data_Repository precinctNJRepository;

    @Autowired
    private GA_Precinct_Data_Repository precinctGARepository;

    public List<Precinct_NJ_Data> getNewJerseyPrecincts(){
        return precinctNJRepository.findAll();
    }

    public List<Precinct_GA_Data> getGeorgiaPrecincts(){
        return precinctGARepository.findAll();
    }
}
