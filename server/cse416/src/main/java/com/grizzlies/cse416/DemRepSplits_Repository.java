package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DemRepSplits_Repository extends MongoRepository<DemRepSplits_Data, ObjectId>{
    List<DemRepSplits_Data> findByState(String state);
}
