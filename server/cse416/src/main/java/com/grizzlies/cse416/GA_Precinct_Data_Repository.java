package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GA_Precinct_Data_Repository extends MongoRepository<Precinct_GA_Data, ObjectId> {
    
}
