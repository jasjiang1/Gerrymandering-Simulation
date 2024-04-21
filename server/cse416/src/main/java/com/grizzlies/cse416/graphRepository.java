package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface graphRepository extends MongoRepository<EI_Data, ObjectId>{
    EI_Data findByStateAndMinority(String state, String minority);
}
