package com.sns.sns_bff.service;

import com.sns.sns_bff.dto.Response;
import com.sns.sns_bff.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private ArrayList<User> allUsers = new ArrayList<>();

    public UserService() {
        User user1 = new User(), user2 = new User();
        user1.setLogin("test1"); user2.setLogin("test2");
        user1.setPassword("123"); user2.setPassword("123");

        allUsers.add(user1);
        allUsers.add(user2);
    }

    public Response<String> authenticate(String login, String password) {
        for(var user : allUsers) {
            if(user.getLogin().equals(login)) {
                if(user.getPassword().equals(password))
                    return new Response(200, "OK");
                return new Response(401, "Incorrect password");
            }
        }
        return new Response(404, "User not found");
    }

    public Response<String> register(User newUser) {
        for(var user : allUsers)
            if(user.getLogin().equals(newUser.getLogin()))
                return new Response(400, "Login is already taken");
        allUsers.add(newUser);
        return new Response(200, "Registration completed!");
    }

}
