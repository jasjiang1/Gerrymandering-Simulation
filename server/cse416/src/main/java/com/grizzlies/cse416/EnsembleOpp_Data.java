package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection="Ensemble-Opp-data")
@Data
public class EnsembleOpp_Data {
    @Id
    private String id;
    private String state;
    private OppData average_opp_37;
    private OppData average_opp_43;
    private OppData average_opp_50;
    private OppData max_opp_37;
    private OppData max_opp_43;
    private OppData max_opp_50;
    
    @Data
    public static class OppData {
        private int total;
        private int white;
        private int aa; // African American
        private int asian;
        private int hispanic;
    }
}
