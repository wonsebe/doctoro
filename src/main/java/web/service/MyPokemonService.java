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
    public MyPokemonDto myPokeExistCheck() {
        System.out.println("MyPokemonService.myPokeExistCheck");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return myPokemonDao.myPokeExistCheck(loginUno);
    }

    // 내 포켓몬 생성
    public boolean myPokeAdd() {
        System.out.println("MyPokemonService.myPokeAdd");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return myPokemonDao.myPokeAdd(loginUno);
    }

    // 내 포켓몬 초기화
    public boolean myPokeReset() {
        System.out.println("MyPokemonService.myPokeReset");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return myPokemonDao.myPokeReset(loginUno);
    }

    // 내 포켓몬 진화
    public boolean myPokeEvolve(MyPokemonDto myPokemonDto) {
        System.out.println("MyPokemonService.myPokeEvolve");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        myPokemonDto.setUno(loginDto.getUno());
        System.out.println("myPokemonDto = " + myPokemonDto);

        return myPokemonDao.myPokeEvolve(myPokemonDto);
    }


}
