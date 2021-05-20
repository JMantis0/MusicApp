package com.musicapp.repository;

import com.musicapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * User repository
 */
@Repository
public interface UserRepository extends MongoRepository<User,String> {

    User findByUsername(String username);
}
