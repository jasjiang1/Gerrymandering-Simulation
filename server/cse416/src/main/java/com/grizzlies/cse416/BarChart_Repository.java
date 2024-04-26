package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarChart_Repository extends MongoRepository<BarChart_Data, ObjectId>{
    BarChart_Data findByState(String state);
}
