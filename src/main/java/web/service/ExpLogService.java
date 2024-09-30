package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ExpLogDao;
import web.model.dao.MyPokemonDao;
import web.model.dto.ExpLogDto;
import web.model.dto.MyPokemonDto;

import java.util.List;

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

    // 총 경험치 값 가져오기
    public int expTotal(int loginUno) {
        System.out.println("ExpLogService.expTotal");
        System.out.println("loginUno = " + loginUno);

        MyPokemonDto myPokemonDto = myPokemonDao.myPokeExistCheck(loginUno);    // 내 포켓몬 번호 가져오기
        System.out.println("myPokemonDto = " + myPokemonDto);
        if (myPokemonDto == null) {     // 내 포켓몬이 존재하지 않은 경우
            return 0;
        }
        int myPokeNo = myPokemonDto.getMpno();
        System.out.println("myPokeNo = " + myPokeNo);

        String expSum = expLogDao.expTotal(myPokeNo);
        if (expSum == null) {
            return 0;
        }
        return Integer.parseInt(expSum);
    }

    // 내 포켓몬 경험치 기록 최근 20개 가져오기
    public List<ExpLogDto> expLogPrint() {
        System.out.println("ExpLogService.expLogPrint");
        return expLogDao.expLogPrint();
    }


}
