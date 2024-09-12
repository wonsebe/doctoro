package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.UserDto;

@Mapper
public interface UserDao {

    // 1. 회원가입
    boolean userSignup(UserDto userDto);

    // 2. 아이디 중복 검사
    String idCheck(String id);

    // 3. 로그인
    UserDto userLogin(UserDto userDto);

    // 4. 마이페이지
    UserDto userMyInfo(int uno);

    // 7. 회원 정보 수정
    boolean userUpdate(UserDto userDto);

    // 8. 회원 탈퇴
    boolean userDelete(UserDto userDto);

}
