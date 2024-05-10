package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import java.util.Map;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Dem-Rep-Splits-data")
public class DemRepSplits_Data {
    @Id
    private String id;
    private String state;
    private int size;
    private String expected_winner;
    private int average_dem_districts;
    private int average_rep_districts;
    private Map<String, Integer> dem_rep_splits;

    public String getId() {
        return id;
    }


    public String getState() {
        return state;
    }

    public int getSize() {
        return size;
    }

    public String getExpectedWinner() {
        return expected_winner;
    }

    public int getAverageDemDistricts() {
        return average_dem_districts;
    }

    public int getAverageRepDistricts() {
        return average_rep_districts;
    }

    public Map<String, Integer> getDemRepSplits() {
        return dem_rep_splits;
    }

}
