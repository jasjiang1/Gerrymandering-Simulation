package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Gingles-Data")
public class Gingles_Data {
    @Id
    private String id;
    private String state;
    private String precinct;
    private String republicPCT;
    private String democraticPCT;
    private double asianPCT;
    private double whitePCT;
    private double hispanicPCT;
    private double africanAmericanPCT;
    private String winner;

    public String getId() {
        return id;
    }

    public String getState() {
        return state;
    }

    public String getPrecinct() {
        return precinct;
    }

    public String getRepublicPCT() {
        return republicPCT;
    }

    public String getDemocraticPCT() {
        return democraticPCT;
    }

    public double getAsianPCT() {
        return asianPCT;
    }

    public double getWhitePCT() {
        return whitePCT;
    }

    public double getHispanicPCT() {
        return hispanicPCT;
    }

    public double getAfricanAmericanPCT() {
        return africanAmericanPCT;
    }

    public String getWinner() {
        return winner;
    }
}
