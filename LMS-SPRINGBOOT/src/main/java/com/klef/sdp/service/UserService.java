package com.klef.sdp.service;

import com.klef.sdp.entity.Role;
import com.klef.sdp.entity.User;
import com.klef.sdp.repository.RoleRepository;
import com.klef.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User register(User user) {
        Role role = roleRepository.findByName(user.getRoles().get(0).getName());
        if (role == null) {
            role = new Role();
            role.setName(user.getRoles().get(0).getName());
            role = roleRepository.save(role);
        }
        user.getRoles().clear();
        user.getRoles().add(role);
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        if (!updatedUser.getRoles().isEmpty()) {
            Role role = roleRepository.findByName(updatedUser.getRoles().get(0).getName());
            if (role == null) {
                role = new Role();
                role.setName(updatedUser.getRoles().get(0).getName());
                role = roleRepository.save(role);
            }
            user.getRoles().clear();
            user.getRoles().add(role);
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}