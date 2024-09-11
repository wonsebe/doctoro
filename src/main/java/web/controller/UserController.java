package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    // 2. 아이디 중복 검사
    @GetMapping("/idcheck")
    public boolean idCheck(String id) {
        System.out.println("UserController.idCheck");
        System.out.println("id = " + id);
        return userService.idCheck(id);
    }

    // 3. 로그인
    @PostMapping("/login")
    public boolean userLogin(UserDto userDto) {
        System.out.println("UserController.login");
        System.out.println("userDto = " + userDto);
        return userService.userLogin(userDto);
    }

    // 4. 로그인 체크
    @GetMapping("/login/check")
    public UserDto userLoginCheck() {
        System.out.println("UserController.userLoginCheck");
        return userService.userLoginCheck();
    }

    // 5. 로그아웃
    @GetMapping("/logout")
    public void userLogout() {
        System.out.println("UserController.userLogout");
        userService.userLogout();
    }


}
