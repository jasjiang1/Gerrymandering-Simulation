package com.grizzlies.cse416;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Properties_NJ_State_Data {
    private String name;
    private int density;

    public String getName() {
        return name;
    }

    public int getDensity() {
        return density;
    }
}
