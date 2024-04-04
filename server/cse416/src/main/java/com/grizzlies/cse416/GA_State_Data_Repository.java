package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GA_State_Data_Repository extends MongoRepository<FeatureCollection_GA_State_Data, ObjectId> {

}
