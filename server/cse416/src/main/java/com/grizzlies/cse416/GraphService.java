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
    
    public EI_Data getEcologicalInferenceData(String state, String minority) {
        return eiGraphRepository.findByStateAndMinority(state, minority);
    }

    public List<Gingles_Data> getGinglesData(String state) {
        return ginglesGraphRepository.findByState(state);
    }
}
