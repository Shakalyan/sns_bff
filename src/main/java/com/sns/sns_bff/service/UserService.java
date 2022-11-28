package com.sns.sns_bff.service;

import com.sns.sns_bff.exception.AuthorizationException;
import com.sns.sns_bff.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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

    public String authenticate(String login, String password) throws AuthorizationException {
        for(var user : allUsers) {
            if(user.getLogin().equals(login)) {
                if(!user.getPassword().equals(password))
                    throw new AuthorizationException(HttpStatus.FORBIDDEN, "Incorrect password");
                return "TOKEN";
            }
        }
        throw new AuthorizationException(HttpStatus.NOT_FOUND, "User not found");
    }

    public void register(User newUser) throws AuthorizationException {
        for(var user : allUsers)
            if(user.getLogin().equals(newUser.getLogin()))
                throw new AuthorizationException(HttpStatus.BAD_REQUEST, "Login is already taken");
        allUsers.add(newUser);
    }

}
