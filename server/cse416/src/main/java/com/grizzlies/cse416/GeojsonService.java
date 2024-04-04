package com.grizzlies.cse416;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeojsonService{ 

    @Autowired
    private NJ_State_Data_Repository repository;

    @Autowired
    private GA_State_Data_Repository gaRepository;

    public List<FeatureCollection_NJ_State_Data> getNewJerseyData(){
        return repository.findAll();
    }

    public List<FeatureCollection_GA_State_Data> getGeorgiaData(){
        return gaRepository.findAll();
    }
}
