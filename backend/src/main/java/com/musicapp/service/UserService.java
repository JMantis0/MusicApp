package com.musicapp.service;

import com.musicapp.model.User;
import com.musicapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service for handling user controller actions
 */
@Service
@AllArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;

    /*
    *
    * Log in
    *
    * */

    /**
     * Logs in a given user and returns the user or null depending on success
     * @param logInAttempt The user to attempt to log in
     * @return The user found, null if none.
     */
    @Override
    public User logIn(User logInAttempt) {
        User potentialUser = userRepository.findByUsername(logInAttempt.getUsername());
        if (potentialUser == null){
            return null;
        }
        if (potentialUser.getPassword().equals(logInAttempt.getPassword())){
            return potentialUser;
        }
        return null;
    }

    /*
    *
    * Create
    *
    * */

    /*
    *
    * read
    * 
    * */

    /**
     * Method for finding and returning a user depending on the entered username
     * @param username The username of the user to find
     * @return The user if found, null otherwise
     */
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /*
    *
    * Update
    *
    * */

    /**
     * Updates a user in the DB based on their username
     * @param user The user to update and the updated info
     * @return The updated user
     */
    @Override
    public User updateUser(User user){
        User foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser == null){
            return null;
        }
        userRepository.deleteById(foundUser.getUserId());
        userRepository.save(user);
        return user;
    }

    /*
    *
    * Delete
    *
    * */
}
