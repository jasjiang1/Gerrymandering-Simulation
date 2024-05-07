package com.grizzlies.cse416;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnsembleOpp_Repository extends MongoRepository<EnsembleOpp_Data, ObjectId>{
    List<EnsembleOpp_Data> findByState(String state);
    
}
