package com.grizzlies.cse416;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeojsonServiceImpl{ //implements GeojsonService{
    // private final NJ_State_Data_Repository repository;

    // @Autowired
    // public GeojsonServiceImpl(NJ_State_Data_Repository repository) {
    //     this.repository = repository;
    // }

    // @Override
    // public FeatureCollection_NJ_State_Data getNewJerseyData() {
    //    List<FeatureCollection_NJ_State_Data> data = repository.findAll();
    //    return data.get(0);
    // }

    @Autowired
    private NJ_State_Data_Repository repository;

    public List<FeatureCollection_NJ_State_Data> getNewJerseyData(){
        return repository.findAll();
    }
}
