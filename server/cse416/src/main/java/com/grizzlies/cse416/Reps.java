package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Document(collection = "reps-data")
@Data
public class Reps {
    @Id
    private String id;
    private String name;
    private String party;
    private String ethnicity;
    private String image;
    private String districtNum;
    private String state;
    private Double voterMargin;


}
