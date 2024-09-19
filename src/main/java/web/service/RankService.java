package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.RankDao;
import web.model.dto.RankDto;

import java.util.List;

@Service
public class RankService {

    @Autowired private RankDao rankDao;

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
        return rankDao.win( pno );
    }

    public RankDto rankwin( int pno ){
        RankDto result1 = rankDao.rankwin( pno );
        return result1;
    }


}
