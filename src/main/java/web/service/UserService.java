package web.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import web.model.dao.UserDao;
import web.model.dto.ExpLogDto;
import web.model.dto.UserDto;

@Service
public class UserService {
    @Autowired private UserDao userDao;
    @Autowired private ExpLogService expLogService;
    @Autowired HttpServletRequest request;      // 현재 요청을 보낸 클라이언트의 HTTP 요청 정보를 가지고 있는 객체를 주입

    // 1. 회원가입
    public boolean userSignup(UserDto userDto) {
        System.out.println("UserService.userSignup");
        userDto.setDistinction("일반");
        System.out.println("userDto = " + userDto);
        return userDao.userSignup(userDto);
    }

    // 2. 아이디 중복 검사
    public boolean idCheck(String id) {
        System.out.println("UserService.idCheck");
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

        UserDto result = userDao.userLogin(userDto);

        // 아이디와 비밀번호가 일치하지 않으면 (null) false 반환, 아이디와 비밀번호가 일치하면 HTTP 세션 처리 후 true 반환
        if (result == null) {
            return false;
        } else {
            UserDto loginDto = UserDto.builder()
                    .uno(result.getUno())
                    .id(result.getId())
                    .ubirth(result.getUbirth())
                    .gender(result.getGender())
                    .distinction(result.getDistinction())
                    .build();
            System.out.println(loginDto);
            // HTTP 세션 처리
            // 1. 현재 요청을 보내온 클라이언트의 세션 객체 호출
            HttpSession session = request.getSession();
            // 2. 세션 객체에 속성 추가
            session.setAttribute("loginDto", loginDto);     // Object로 타입변환이 된다

            // 경험치 기록 - 로그인 10 경험치
            ExpLogDto expLogDto = ExpLogDto.builder()
                    .expvalue(10)
                    .expmethod("로그인")
                    .build();
            System.out.println("expLogDto = " + expLogDto);
            expLogService.pokeExpLogAdd(expLogDto, result.getUno());

            return true;
        }
    }

    // 4. 로그인 체크
    public UserDto userLoginCheck() {
        System.out.println("UserService.userLoginCheck");
        // 1. 현재 요청을 보내온 클라이언트의 세션객체호출
        HttpSession session = request.getSession();
        // 2. 세션 객체 내 속성 값 호출, 타입변환 필요
        Object object = session.getAttribute("loginDto");
        if (object != null) {
            return (UserDto)object;
        }
        return null;
    }

    // 5. 로그아웃 : 세션 초기화
    public void userLogout() {
        System.out.println("UserService.userLogout");
        // 1. 현재 요청을 보내온 클라이언트의 세션 객체 호출
        HttpSession session = request.getSession();
        // 2. 세션 객체 내 모든 속성 값 초기화
        session.invalidate();
    }

    // 6. 내 정보 호출
    public UserDto userMyInfo() {
        System.out.println("UserService.userMyInfo");
        UserDto loginDto = userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int uno = loginDto.getUno();
        return userDao.userMyInfo(uno);
    }

    // 7. 회원 정보 수정
    public boolean userUpdate(UserDto userDto) {
        System.out.println("UserService.userUpdate");

        UserDto loginDto = userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        userDto.setUno(loginDto.getUno());
        System.out.println("userDto = " + userDto);

        return userDao.userUpdate(userDto);
    }

    // 8. 회원 탈퇴
    public boolean userDelete(UserDto userDto) {
        System.out.println("UserService.userDelete");

        UserDto loginDto = userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        userDto.setUno(loginDto.getUno());
        System.out.println("userDto = " + userDto);

        boolean result = userDao.userDelete(userDto);
        // 회원 탈퇴 성공 시 로그아웃
        if (result) {
            userLogout();
        }
        return result;
    }

    // 9. 아이디 찾기
    public String userFindId(UserDto userDto) {
        System.out.println("UserService.userFindId");
        System.out.println("userDto = " + userDto);
        return userDao.userFindId(userDto);
    }

    // 10. 비밀번호 찾기
    public UserDto userFindPw(UserDto userDto) {
        System.out.println("UserService.userFindPw");
        System.out.println("userDto = " + userDto);
        return userDao.userFindPw(userDto);
    }

    // 11. 비밀번호 재설정
    public boolean userResetPw(UserDto userDto) {
        System.out.println("UserService.userResetPw");
        System.out.println("userDto = " + userDto);
        return userDao.userResetPw(userDto);
    }

    // 12. 전화번호 중복 검사
    public boolean phoneCheck(String phone) {
        System.out.println("UserController.phoneCheck");
        System.out.println("phone = " + phone);
        String result = userDao.phoneCheck(phone);
        System.out.println("result = " + result);
        // 전화번호가 존재하지 않으면 (null) true 반환, 아이디가 존재하면 false 반환
        if (result == null) {
            return true;
        } else {
            return false;
        }
    }

}
