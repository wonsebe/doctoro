package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.UserDto;

@Mapper
public interface UserDao {

    // 1. 회원가입
    boolean userSignup(UserDto userDto);

}
