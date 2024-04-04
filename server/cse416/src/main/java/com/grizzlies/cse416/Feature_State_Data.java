package com.grizzlies.cse416;

import java.util.Properties;

import com.mongodb.client.model.geojson.Geometry;

public class Feature_State_Data {
    private String type;
    private String id;
    private Properties_NJ_State_Data properties;
    private Geometry_NJ_State_Data geometry;

    public String getType() {
        return type;
    }

    public String getId() {
        return id;
    }

    public Properties_NJ_State_Data getProperties() {
        return properties;
    }

    public Geometry_NJ_State_Data getGeometry() {
        return geometry;
    }
}
