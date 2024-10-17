package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.VoteDao;
import web.model.dto.VoteCityDto;

import java.util.ArrayList;
import java.util.List;

@Service
public class VoteService {

    @Autowired
    VoteDao voteDao;

    public ArrayList<VoteCityDto> cityAllRead(){
        System.out.println("VoteService.cityAllRead");
        return voteDao.cityAllRead();
    }
}
