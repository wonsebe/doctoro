package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.RankDao;
import web.model.dto.ExpLogDto;
import web.model.dto.RankDto;
import web.model.dto.UserDto;

import java.util.List;

@Service
public class RankService {

    @Autowired private RankDao rankDao;
    @Autowired private UserService userService;
    @Autowired private ExpLogService expLogService;

    public RankDto total( int pno ){
//        System.out.println("pno = " + pno);
        RankDto result = rankDao.total( pno );
//        System.out.println("result = " + result);
        return result;
    }

    public boolean click( int pno ){
        return rankDao.click( pno );
    }

    public boolean win( int pno ){
        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        boolean result = rankDao.win( pno );

        if (result) {   // 이상형 월드컵 종료 후 승리 횟수 증가 시
            // 경험치 기록 - 이상형 월드컵 10 경험치
            ExpLogDto expLogDto = ExpLogDto.builder()
                    .expvalue(10)
                    .expmethod("이상형 월드컵")
                    .build();
            System.out.println("expLogDto = " + expLogDto);
            expLogService.pokeExpLogAdd(expLogDto, loginUno);
        }

        return result;
    }


}
