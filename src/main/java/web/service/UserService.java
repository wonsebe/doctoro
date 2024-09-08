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



}
