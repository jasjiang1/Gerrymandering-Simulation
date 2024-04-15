package com.grizzlies.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/geojson/district")
public class DistrictController {
    @Autowired
    private DemographicService demographicService;

    @GetMapping("/newjersey")
    public ResponseEntity<List<District_Data>> getDistrictPlanNJ() {
        return new ResponseEntity<>(demographicService.getDistrictPlan("NJ"), HttpStatus.OK);
    }

    @GetMapping("/georgia")
    public ResponseEntity<List<District_Data>> getDistrictPlanGA() {
        return new ResponseEntity<>(demographicService.getDistrictPlan("GA"), HttpStatus.OK);
    }

    @GetMapping("/{state}/{districtId}")
    public ResponseEntity<District_Data> getSpecificDistrict(@PathVariable String state, String districtId){
        District_Data district = demographicService.getDistrict(state, districtId);
        if (district != null){
            return new ResponseEntity<>(district, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
