package com.grizzlies.cse416;

import org.springframework.data.mongodb.core.mapping.Document;
import net.minidev.json.JSONObject;
import org.springframework.data.annotation.Id;

@Document(collection = "GA-precinct-data")
public class Precinct_GA_Data {
    @Id
    private String id;
    private String type;
    private Properties_Precinct_Data properties;
    private JSONObject geometry;

    public String getType(){
        return type;
    }

    public String getId() {
        return id;
    }

    public Properties_Precinct_Data getProperties() {
        return properties;
    }

    public JSONObject getGeometry() {
        return geometry;
    }
    
}
