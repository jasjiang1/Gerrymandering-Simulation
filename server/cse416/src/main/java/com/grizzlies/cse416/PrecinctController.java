package com.grizzlies.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/geojson/precinct")
public class PrecinctController {

    @Autowired
    private PrecinctService precinctService;

    @GetMapping("/newjersey")
    public ResponseEntity<List<Precinct_NJ_Data>> getPrecinctsNJ() {
        return new ResponseEntity<>(precinctService.getNewJerseyPrecincts(), HttpStatus.OK);
    }
    
    @GetMapping("/georgia")
    public ResponseEntity<List<Precinct_GA_Data>> getPrecinctsGA() {
        return new ResponseEntity<>(precinctService.getGeorgiaPrecincts(), HttpStatus.OK);
    }
}
