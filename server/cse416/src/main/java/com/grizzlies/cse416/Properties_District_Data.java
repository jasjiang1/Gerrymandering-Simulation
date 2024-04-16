package com.grizzlies.cse416;

import org.springframework.data.mongodb.core.mapping.Field;

public class Properties_District_Data {
    private int ID;
    private String district;
    private String ADJ_POPULA;
    private int Hispanic;
    private int White;
    private int AfricanAmerican;
    private int NativeAmerican;
    private int Asian;
    private int Hawaiian;
    private int Other;
    private String state;

    public int getID() {
        return ID;
    }

    @Field("DISTRICT")
    public String getDistrict() {
        return district;
    }

    @Field("ADJ_POPULA")
    public String getPopulation() {
        return ADJ_POPULA;
    }

    public int getHispanic() {
        return Hispanic;
    }

    public int getWhite() {
        return White;
    }

    public int getAfricanAmerican() {
        return AfricanAmerican;
    }

    public int getNativeAmerican() {
        return NativeAmerican;
    }

    public int getAsian() {
        return Asian;
    }

    public int getHawaiian() {
        return Hawaiian;
    }

    public int getOther() {
        return Other;
    }

    @Field("STATE")
    public String getState() {
        return state;
    }
}
