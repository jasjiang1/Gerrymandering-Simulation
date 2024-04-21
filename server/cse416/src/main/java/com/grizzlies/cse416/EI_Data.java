package com.grizzlies.cse416;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import net.minidev.json.JSONObject;

@Document(collection = "EI-Data")
public class EI_Data {
    @Id
    private String id;
    private String state;
    private String minority;
    private ArrayList<JSONObject> minorityEI;
    private ArrayList<JSONObject> otherEI;

    public String getID() {
        return id;
    }

    public String getState() {
        return state;
    }

    public String getMinority() {
        return minority;
    }

    public ArrayList<JSONObject> getMinorityEI() {
        return minorityEI;
    }

    public ArrayList<JSONObject> getOtherEI() {
        return otherEI;
    }
}
