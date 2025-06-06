package com.grizzlies.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RepsService {
    @Autowired
    private RepsRepository reps;

    public List<Reps> getAllReps(){
        return reps.findAll();
    }

    public List<Reps> getRepsByParty(String party) {
        return reps.findByParty(party);
    }

    public List<Reps> getRepsByDistrict(String DistrictNum) {
        return reps.findByDistrictNum(DistrictNum);
    }

    public List<Reps> getRepsByState(String state) {
        return reps.findByState(state);
    }
}
