package com.grizzlies.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/goejson")
public class GeojsonController {
    private final GeojsonService geoJsonService;

    @Autowired
    public GeojsonController(GeojsonService geoJsonService) {
        this.geoJsonService = geoJsonService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/newjersey")
    public ResponseEntity<FeatureCollection_NJ_State_Data> getNewJerseyGeoJson() {
        FeatureCollection_NJ_State_Data featureCollection = geoJsonService.getNewJerseyData();
        if (featureCollection != null) {
            return ResponseEntity.ok(featureCollection);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
