package com.grizzlies.cse416;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GraphService {

    @Autowired
    private eiGraphRepository eiGraphRepository;

    @Autowired
    private ginglesGraphRepository ginglesGraphRepository;
    
    @Autowired
    private BarChart_Repository barChartRepository;

    @Autowired
    private BoxAndWhisker_Repository boxAndWhiskerRepository;

    @Autowired
    private DemRepSplits_Repository demRepSplitsRepository;

    @Autowired
    private EnsembleOpp_Repository ensembleOppRepository;
    
    @Autowired
    private VoteSeatShare_Repository voteSeatShareRepository;

    public EI_Data getEcologicalInferenceData(String state, String minority) {
        return eiGraphRepository.findByStateAndMinority(state, minority);
    }

    public List<Gingles_Data> getGinglesData(String state) {
        return ginglesGraphRepository.findByState(state);
    }

    public BarChart_Data getBarChartData(String state) {
        return barChartRepository.findByState(state);
    }

    public List<BoxAndWhisker_Data> getBoxAndWhiskerData(String state){
        return boxAndWhiskerRepository.findByState(state);
    }

    public List<DemRepSplits_Data> getDemRepSplitsData(String state){
        return demRepSplitsRepository.findByState(state);
    }

    public List<EnsembleOpp_Data> getEnsembleOppData(String state){
        return ensembleOppRepository.findByState(state);
    }

    public VoteSeatShare_Data getVoteSeatShareData(String state){
        return voteSeatShareRepository.findByState(state);
    }
}
