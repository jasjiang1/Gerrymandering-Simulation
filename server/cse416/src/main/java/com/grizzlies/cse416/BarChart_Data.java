package com.grizzlies.cse416;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BarChart-Data")
public class BarChart_Data {
    @Id
    private String id;
    private String state;
    private List<Double> populationPercentages;
    private List<Double> districtRepresentativesPercentages;

    public String getId(){
        return id;
    }

    public String getState(){
        return state;
    }

    public List<Double> getPopulationPercentages(){
        return populationPercentages;
    }

    public List<Double> getDistrictRepresentativesPercentages(){
        return districtRepresentativesPercentages;
    }

}
