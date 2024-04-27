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
@RequestMapping("/api/geojson")
public class GeojsonController {
    @Autowired
    private  GeojsonService geoJsonService;

    @GetMapping("/newjersey")
    public ResponseEntity<List<FeatureCollection_NJ_State_Data>> getNewJerseyGeoJson() {
        return new ResponseEntity<List<FeatureCollection_NJ_State_Data>>(geoJsonService.getNewJerseyData(), HttpStatus.OK);
    }
    @GetMapping("/georgia")
    public ResponseEntity<List<FeatureCollection_GA_State_Data>> getGeorgiaGeoJson() {
        return new ResponseEntity<List<FeatureCollection_GA_State_Data>>(geoJsonService.getGeorgiaData(), HttpStatus.OK);
    }
}
