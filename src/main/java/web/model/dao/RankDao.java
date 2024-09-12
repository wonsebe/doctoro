package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.RankDto;

import java.util.List;

@Mapper
public interface RankDao {

    //종합 순위 출력
    RankDto total( int pno );

    //토너먼트용
    RankDto click ( int pno );
}
