package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.VoteCityDto;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface VoteDao {


    ArrayList<VoteCityDto> cityAllRead();

}
