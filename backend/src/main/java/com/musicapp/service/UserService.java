package com.musicapp.service;

import com.musicapp.model.User;
import com.musicapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.xml.ws.spi.http.HttpHandler;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

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

    @Override
    public User logIn(User user) {
        List<User> potentialUsers = userRepository.findByUsername(user.getUsername());
        for (User potentialUser : potentialUsers){
            if (potentialUser.getPassword().equals(user.getPassword())){
                return potentialUser;
            }
        }
        return null;
    }
}
