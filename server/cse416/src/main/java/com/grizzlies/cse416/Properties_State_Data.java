package com.grizzlies.cse416;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
public class Properties_State_Data {
    private String name;
    private int totalPopulation;
    private int white;
    private int africanAmerican;
    private int americanIndian;
    private int asian;
    private int hispanic;
    private int hawaiian;
    private int other;

}
