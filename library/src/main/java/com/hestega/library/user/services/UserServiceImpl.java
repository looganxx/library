package com.hestega.library.user.services;

import com.hestega.library.user.entity.UserEntity;
import com.hestega.library.user.model.User;
import com.hestega.library.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        List<UserEntity> userEntities = userRepository.findAll();

        List<User> users = userEntities.stream().map(u ->
                new User(u.getEmail(),
                        u.getFirstName(),
                        u.getLastName())).collect(Collectors.toList());

        return users;
    }
}
