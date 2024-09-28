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

    // 6. 내 정보 호출
    UserDto userMyInfo(int uno);

    // 7. 회원 정보 수정
    boolean userUpdate(UserDto userDto);

    // 8. 회원 탈퇴
    boolean userDelete(UserDto userDto);

    // 9. 아이디 찾기
    String userFindId(UserDto userDto);

    // 10. 비밀번호 찾기
    UserDto userFindPw(UserDto userDto);

    // 11. 비밀번호 재설정
    boolean userResetPw(UserDto userDto);

    // 12. 전화번호 중복 검사
    String phoneCheck(String phone);

}
