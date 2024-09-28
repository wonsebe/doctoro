package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.MyPokemonDao;
import web.model.dto.MyPokemonDto;
import web.model.dto.UserDto;

@Service
public class MyPokemonService {
    @Autowired private MyPokemonDao myPokemonDao;
    @Autowired private UserService userService;

    // 내 포켓몬 존재 유무
    public MyPokemonDto MyPokeExistCheck() {
        System.out.println("MyPokemonService.MyPokeExistCheck");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return myPokemonDao.MyPokeExistCheck(loginUno);
    }

}
