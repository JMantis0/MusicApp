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
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User update(User user) {
        userRepository.findById(user.getUserId()).orElseThrow(
                () -> new IllegalArgumentException("User does not exist")
        );
        return userRepository.save(user);
    }


    @Override
    public void delete(String id) {
        userRepository.deleteById(id);
    }
    */

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


}