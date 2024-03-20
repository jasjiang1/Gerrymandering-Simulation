package com.grizzlies.cse416;

import java.util.Properties;

import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.client.model.geojson.Geometry;

@Document
public class Feature_NJ_State_Data {
    private String type;
    private String id;
    private Properties properties;
    private Geometry geometry;

    public String getType() {
        return type;
    }

    public String getId() {
        return id;
    }

    public Properties getProperties() {
        return properties;
    }

    public Geometry getGeometry() {
        return geometry;
    }
}
