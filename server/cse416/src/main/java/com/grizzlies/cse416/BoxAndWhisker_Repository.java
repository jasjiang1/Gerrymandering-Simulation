package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BoxAndWhisker_Repository extends MongoRepository<BoxAndWhisker_Data, ObjectId>{
    List<BoxAndWhisker_Data> findByState(String state);   
}
