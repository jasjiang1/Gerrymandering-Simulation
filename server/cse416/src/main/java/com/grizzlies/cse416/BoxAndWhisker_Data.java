package com.grizzlies.cse416;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "Box-And-Whiskers-data")
@Data
public class BoxAndWhisker_Data {
    @Id
    private String id;
    private String state;
    private int size;
    private String race;
    private List<IndexDistrict> index_districts;

    @Data
    public static class IndexDistrict {
        private double q1;
        private double q2;
        private double q3;
        private double min;
        private double max;
    }

}
