package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.RankDao;
import web.model.dto.RankDto;

import java.util.List;

@Service
public class RankService {

    @Autowired private RankDao rankDao;

    public List<RankDto> total(){
        return rankDao.total();
    }
}
