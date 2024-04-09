package com.grizzlies.cse416;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RepsRepository extends MongoRepository<Reps, ObjectId>{
    List<Reps> findByParty(Party party);

    List<Reps> findByDistrictNum(String districtNum);
}
