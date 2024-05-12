package com.grizzlies.cse416;

import java.util.List;

import org.apache.catalina.connector.Response;
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

    @GetMapping("barchart/{state}")
    public ResponseEntity<BarChart_Data> getBarChart(@PathVariable String state) {
        BarChart_Data barChartData = graphService.getBarChartData(state);
        return new ResponseEntity<>(barChartData, HttpStatus.OK);
    }

    @GetMapping("box_and_whisker/{state}")
    public ResponseEntity<List<BoxAndWhisker_Data>> getBoxAndWhisker(@PathVariable String state) {
        List<BoxAndWhisker_Data> boxAndWhiskerData = graphService.getBoxAndWhiskerData(state);
        return new ResponseEntity<>(boxAndWhiskerData, HttpStatus.OK);
    }

    @GetMapping("dem_rep_splits/{state}")
    public ResponseEntity<List<DemRepSplits_Data>> getDemRepSplits(@PathVariable String state){
        List<DemRepSplits_Data> demRepSplitsData = graphService.getDemRepSplitsData(state);
        return new ResponseEntity<>(demRepSplitsData, HttpStatus.OK);
    }

    @GetMapping("ensembleOpp/{state}")
    public ResponseEntity<List<EnsembleOpp_Data>> getEnsembleOpp(@PathVariable String state){
        List<EnsembleOpp_Data> ensembleOppData = graphService.getEnsembleOppData(state);
        return new ResponseEntity<>(ensembleOppData, HttpStatus.OK);
    }

    @GetMapping("vote_seat_share_curve/{state}")
    public ResponseEntity<VoteSeatShare_Data> getVoteSeatShareCurve(@PathVariable String state){
        VoteSeatShare_Data voteSeatShareData = graphService.getVoteSeatShareData(state);
        return new ResponseEntity<>(voteSeatShareData, HttpStatus.OK);
    }
}