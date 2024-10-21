package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.VoteCityDto;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface VoteDao {


    //  마을 테이블 전체 출력
    ArrayList<VoteCityDto> cityAllRead();


    //  투표 기록 insert
    boolean cityVoteRecord(VoteCityDto voteCityDto);

    // 투표 기록 1등 출력
    List<VoteCityDto> cityVoteRecordFirst();

    // 투표 기록 2등 출력
    List<VoteCityDto> cityVoteRecordSecond();

    // 투표 기록 3등 출력
    List<VoteCityDto> cityVoteRecordThird();
}
