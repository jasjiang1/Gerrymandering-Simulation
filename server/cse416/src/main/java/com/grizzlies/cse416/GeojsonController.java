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
    private  GeojsonServiceImpl geoJsonService;

    // @Autowired
    // public GeojsonController(GeojsonService geoJsonService) {
    //     this.geoJsonService = geoJsonService;
    // }

    @GetMapping("/newjersey")
    public ResponseEntity<List<FeatureCollection_NJ_State_Data>> getNewJerseyGeoJson() {
        return new ResponseEntity<List<FeatureCollection_NJ_State_Data>>(geoJsonService.getNewJerseyData(), HttpStatus.OK);
        // ResponseEntity<List<FeatureCollection_NJ_State_Data>> featureCollection = geoJsonService.getNewJerseyData();
        // if (featureCollection != null) {
        //     return ResponseEntity.ok(featureCollection);
        // } else {
        //     return ResponseEntity.notFound().build();
        // }
    }
    // @GetMapping("/testing")
    // public ResponseEntity<String> getTest() {
    //     return new ResponseEntity<String>("Hello ajdklsjkasd", HttpStatus.OK);
    //     // ResponseEntity<List<FeatureCollection_NJ_State_Data>> featureCollection = geoJsonService.getNewJerseyData();
    //     // if (featureCollection != null) {
    //     //     return ResponseEntity.ok(featureCollection);
    //     // } else {
    //     //     return ResponseEntity.notFound().build();
    //     // }
    // }
}
