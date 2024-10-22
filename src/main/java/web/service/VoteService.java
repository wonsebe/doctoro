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

    // 마을 테이블 출력
    public ArrayList<VoteCityDto> cityAllRead(){
        return voteDao.cityAllRead();
    }

    // 투표 기록 insert
    public boolean cityVoteRecord(VoteCityDto voteCityDto){
        return voteDao.cityVoteRecord(voteCityDto);
    }

    // 투표 기록 1등 출력
    public List<VoteCityDto> cityVoteRecordFirst(){
        return voteDao.cityVoteRecordFirst();
    }

    // 투표 기록 2등 출력
    public List<VoteCityDto> cityVoteRecordSecond(){
        return voteDao.cityVoteRecordSecond();
    }

    // 투표 기록 3등 출력
    public List<VoteCityDto> cityVoteRecordThird(){
        return voteDao.cityVoteRecordThird();
    }
    //
}
