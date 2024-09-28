package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ExpLogDao;
import web.model.dao.MyPokemonDao;
import web.model.dto.ExpLogDto;
import web.model.dto.MyPokemonDto;

@Service
public class ExpLogService {
    @Autowired private ExpLogDao expLogDao;

    @Autowired private MyPokemonDao myPokemonDao;

    // 포켓몬 경험치 기록하기
    public boolean pokeExpLogAdd(ExpLogDto expLogDto, int loginUno) {
        System.out.println("ExpLogService.pokeExpLogAdd");

        MyPokemonDto myPokemonDto = myPokemonDao.myPokeExistCheck(loginUno);    // 내 포켓몬 번호 가져오기
        if (myPokemonDto == null) {     // 내 포켓몬이 존재하지 않은 경우
            return false;
        }
        expLogDto.setMpno(myPokemonDto.getMpno());      // expLogDto에 내 포켓몬 번호도 추가해주기
        System.out.println("expLogDto = " + expLogDto);

        return expLogDao.pokeExpLogAdd(expLogDto);
    }


}
