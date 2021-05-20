package com.musicapp.service;

import com.musicapp.model.User;
import com.musicapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


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

    @Override
    public User logIn(User logInAttempt) {
        User potentialUser = userRepository.findByUsername(logInAttempt.getUsername());
        if (potentialUser.getPassword().equals(logInAttempt.getPassword())){
            return potentialUser;
        }
        return null;
    }


}
