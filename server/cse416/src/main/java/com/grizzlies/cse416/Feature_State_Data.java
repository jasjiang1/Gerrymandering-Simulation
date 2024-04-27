package com.grizzlies.cse416;

public class Feature_State_Data {
    private String type;
    private String id;
    private Properties_State_Data properties;
    private Geometry_State_Data geometry;

    public String getType() {
        return type;
    }

    public String getId() {
        return id;
    }

    public Properties_State_Data getProperties() {
        return properties;
    }

    public Geometry_State_Data getGeometry() {
        return geometry;
    }
}
