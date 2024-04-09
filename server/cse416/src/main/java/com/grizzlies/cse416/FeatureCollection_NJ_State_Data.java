package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "NJ-state-data")
public class FeatureCollection_NJ_State_Data {
    @Id
    private String id;
    private String type;
    @DocumentReference
    private List<Feature_State_Data> features;

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public List<Feature_State_Data> getFeatures() {
        return features;
    }
}
