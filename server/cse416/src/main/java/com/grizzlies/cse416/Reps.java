package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

// enum Party{
//     R, //Republican
//     D  //Democrat
// }
// enum Ethnicity{
//     White,
//     African_American,
//     Asian,
//     Hispanic
// }
// enum State{
//     GA,
//     NJ
// }

@Document(collection = "reps-data")
@Data
public class Reps {
    @Id
    private String id;
    private String name;
    //private Party party;
    private String party;
    //private Ethnicity ethnicity;
    private String ethnicity;
    private String image;
    private String districtNum;
    //private State state;
    private String state;


}
