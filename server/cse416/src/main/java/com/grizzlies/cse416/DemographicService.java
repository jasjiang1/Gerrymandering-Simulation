package com.grizzlies.cse416;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

@Service
public class DemographicService {

    @Autowired
    private District_Repository districtRepository;

    @Cacheable(value = "districtPlans", key = "#state")
    public List<District_Data> getDistrictPlan(String state) {
        return districtRepository.findByPropertiesState(state);
    }

    @Cacheable(value = "singleDistrict", key = "#state + '-' + #district")
    public District_Data getDistrict(String state, String district) {
        return districtRepository.findByPropertiesStateAndPropertiesDistrict(state, district);
    }
}
