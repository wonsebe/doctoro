package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.UserDto;

@Mapper
public interface UserDao {

    // 1. 회원가입
    boolean userSignup(UserDto userDto);

    // 2. 아이디 중복 검사
    String idCheck(String id);



}
