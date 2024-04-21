package com.grizzlies.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GraphService {

    @Autowired
    private graphRepository graphRepository;

    public EI_Data getEcologicalInferenceData(String state, String minority) {
        return graphRepository.findByStateAndMinority(state, minority);
    }
}
