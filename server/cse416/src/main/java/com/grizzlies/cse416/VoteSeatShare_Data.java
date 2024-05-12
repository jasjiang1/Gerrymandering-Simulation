package com.grizzlies.cse416;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Document(collection = "Vote-Seat-Share-Data")
public class VoteSeatShare_Data {

    @Id
    private String id;

    private String state;

    @Field("vote_seat_share_curve")
    private List<VoteSeatShare> voteSeatShareCurve;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<VoteSeatShare> getVoteSeatShareCurve() {
        return voteSeatShareCurve;
    }

    public void setVoteSeatShareCurve(List<VoteSeatShare> voteSeatShareCurve) {
        this.voteSeatShareCurve = voteSeatShareCurve;
    }

    public static class VoteSeatShare {
        private String votes;
        private String seatsR;
        private String seatsD;

        public String getVotes() {
            return votes;
        }

        public void setVotes(String votes) {
            this.votes = votes;
        }

        public String getSeatsR() {
            return seatsR;
        }

        public void setSeatsR(String seatsR) {
            this.seatsR = seatsR;
        }

        public String getSeatsD() {
            return seatsD;
        }

        public void setSeatsD(String seatsD) {
            this.seatsD = seatsD;
        }
    }
}

