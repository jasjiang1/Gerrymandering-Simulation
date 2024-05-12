package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteSeatShare_Repository extends MongoRepository<VoteSeatShare_Data, ObjectId>{
    VoteSeatShare_Data findByState(String party);
}
