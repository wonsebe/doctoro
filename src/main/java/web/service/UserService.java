package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.UserDao;
import web.model.dto.UserDto;

@Service
public class UserService {
    @Autowired private UserDao userDao;

    // 1. 회원가입
    public boolean userSignup(UserDto userDto) {
        System.out.println("UserService.userSignup");
        userDto.setDistinction("일반");
        System.out.println("userDto = " + userDto);
        return userDao.userSignup(userDto);
    }

    // 2. 아이디 중복 검사
    public boolean idCheck(String id) {
        System.out.println("UserController.idCheck");
        System.out.println("id = " + id);
        String result = userDao.idCheck(id);
        System.out.println("result = " + result);
        // 아이디가 존재하지 않으면 (null) true 반환, 아이디가 존재하면 false 반환
        if (result == null) {
            return true;
        } else {
            return false;
        }
    }

    // 3. 로그인
    public boolean userLogin(UserDto userDto) {
        System.out.println("UserService.login");
        System.out.println("userDto = " + userDto);
        String result = userDao.userLogin(userDto);
        // 아이디와 비밀번호가 일치하지 않으면 (null) false 반환, 아이디와 비밀번호가 일치하면 true 반환
        if (result == null) {
            return false;
        } else {
            return true;
        }
    }



}
