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
}
