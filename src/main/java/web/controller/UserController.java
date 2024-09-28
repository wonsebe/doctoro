package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    @GetMapping("/check/id")
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

    // 6. 내 정보 호출
    @GetMapping("/my/info")
    public UserDto userMyInfo() {
        System.out.println("UserController.userMyInfo");
        return userService.userMyInfo();
    }

    // 7. 회원 정보 수정
    @PutMapping("/update")
    public boolean userUpdate(UserDto userDto) {
        System.out.println("UserController.userUpdate");
        System.out.println("userDto = " + userDto);
        return userService.userUpdate(userDto);
    }

    // 8. 회원 탈퇴
    @DeleteMapping("/delete")
    public boolean userDelete(UserDto userDto) {
        System.out.println("UserController.userDelete");
        System.out.println("userDto = " + userDto);
        return userService.userDelete(userDto);
    }

    // 9. 아이디 찾기
    @GetMapping("/find/id")
    public String userFindId(UserDto userDto) {
        System.out.println("UserController.userFindId");
        System.out.println("userDto = " + userDto);
        return userService.userFindId(userDto);
    }
    
    // 10. 비밀번호 찾기
    @GetMapping("/find/pw")
    public UserDto userFindPw(UserDto userDto) {
        System.out.println("UserController.userFindPw");
        System.out.println("userDto = " + userDto);
        return userService.userFindPw(userDto);
    }

    // 11. 비밀번호 재설정
    @PutMapping("/reset/pw")
    public boolean userResetPw(UserDto userDto) {
        System.out.println("UserController.userResetPw");
        System.out.println("userDto = " + userDto);
        return userService.userResetPw(userDto);
    }

    // 12. 전화번호 중복 검사
    @GetMapping("/check/phone")
    public boolean phoneCheck(String phone) {
        System.out.println("UserController.phoneCheck");
        System.out.println("phone = " + phone);
        return userService.phoneCheck(phone);
    }

}
