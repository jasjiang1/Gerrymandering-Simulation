package com.grizzlies.cse416;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/graph")
public class GraphController {

    @Autowired
    private GraphService graphService;

    @GetMapping("/ei/{state}/{minority}")
    public ResponseEntity<EI_Data> getMinorityEI(@PathVariable String state, @PathVariable String minority){
        EI_Data ecologicalInferenceData = graphService.getEcologicalInferenceData(state, minority);
        return new ResponseEntity<>(ecologicalInferenceData, HttpStatus.OK);
    }

    @GetMapping("/gingles/{state}")
    public ResponseEntity<List<Gingles_Data>> getGingles(@PathVariable String state) {
        List<Gingles_Data> getGingles = graphService.getGinglesData(state);
        return new ResponseEntity<>(getGingles, HttpStatus.OK);
    }
}