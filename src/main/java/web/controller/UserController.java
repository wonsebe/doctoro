package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.UserDto;
import web.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired private UserService userService;

    // 1. 회원가입
    @PostMapping("/signup")
    public boolean userSignup(UserDto userDto) {
        System.out.println("UserController.userSignup");
        System.out.println("userDto = " + userDto);
        return userService.userSignup(userDto);
    }

}
