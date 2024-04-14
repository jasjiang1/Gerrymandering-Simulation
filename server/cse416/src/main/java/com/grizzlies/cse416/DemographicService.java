package com.grizzlies.cse416;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DemographicService {

    @Autowired
    private District_Repository districtRepository;

    public List<District_Data> getDistrictPlan(String state) {
        return districtRepository.findByPropertiesState(state);
    }
}
