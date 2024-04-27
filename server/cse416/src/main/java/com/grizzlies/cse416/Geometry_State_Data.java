package com.grizzlies.cse416;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Geometry_State_Data {
    private String type;
    private List<List<List<List<Double>>>> coordinates;

    public String getType() {
        return type;
    }

    public List<List<List<List<Double>>>> getCoordinates() {
        return coordinates;
    }
}

