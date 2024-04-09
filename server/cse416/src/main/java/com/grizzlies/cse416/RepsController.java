package com.grizzlies.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/reps")
public class RepsController {

    @Autowired 
    private RepsService service;

    @GetMapping
    public ResponseEntity<List<Reps>> getReps(
            @RequestParam(value = "party", required = false) Party party,
            @RequestParam(value = "districtNum", required = false) String districtNum){

            if(party != null){
                List<Reps> repsByParty = service.getRepsByParty(party);
                return ResponseEntity.ok(repsByParty);
            }

            if(districtNum != null){
                List<Reps> repsByDistrict = service.getRepsByDistrict(districtNum);
                return ResponseEntity.ok(repsByDistrict);
            }

            List<Reps> allReps = service.getAllReps();
            return ResponseEntity.ok(allReps);
        }
    
}
