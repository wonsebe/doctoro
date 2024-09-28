package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ExpLogDto;

@Mapper
public interface ExpLogDao {

    // 포켓몬 경험치 기록하기
    boolean pokeExpLogAdd(ExpLogDto expLogDto);

}
