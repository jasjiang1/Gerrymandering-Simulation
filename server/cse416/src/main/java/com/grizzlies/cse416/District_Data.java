package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import net.minidev.json.JSONObject;

@Document(collection = "District-Data")
public class District_Data {
    @Id
    private String id;
    private String type;
    private Properties_District_Data properties;
    private JSONObject geometry;

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public JSONObject getGeometry() {
        return geometry;
    }

    @Field("properties")
    public Properties_District_Data getProperties() {
        return properties;
    }
}
