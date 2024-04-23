package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ginglesGraphRepository extends MongoRepository<Gingles_Data, ObjectId> {
    List<Gingles_Data> findByState(String state);
}
