package com.grizzlies.cse416;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface District_Repository extends MongoRepository<District_Data, ObjectId>{
    List<District_Data> findByPropertiesState(String state);
    District_Data findByPropertiesStateAndPropertiesDistrict(String state, String district);
}
