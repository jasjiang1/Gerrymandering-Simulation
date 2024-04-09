package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

enum Party{
    R, //Republican
    D  //Democrat
}
enum Ethnicity{
    White,
    Black,
    Asian,
    Hispanic
}
enum State{
    GA,
    NJ
}

@Document(collection = "reps-data")
@Data
public class Reps {
    @Id
    private String id;
    private String name;
    private Party party;
    private Ethnicity ethnicity;
    private String image;
    private String districtNum;
    private State state;


}
