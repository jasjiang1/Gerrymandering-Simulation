package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NJ_Precinct_Data_Repository extends MongoRepository<Precinct_NJ_Data, ObjectId>{
    
}
