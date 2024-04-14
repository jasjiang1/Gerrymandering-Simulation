package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "District-Data")
public class District_Data {
    @Id
    private String id;
    private String type;
    private Properties_District_Data properties;
    private Geometry_State_Data geometry;

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public Geometry_State_Data getGeometry() {
        return geometry;
    }

    @Field("properties")
    public Properties_District_Data getProperties() {
        return properties;
    }
}
