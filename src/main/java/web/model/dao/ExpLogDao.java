package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ExpLogDto;

import java.util.List;

@Mapper
public interface ExpLogDao {

    // 포켓몬 경험치 기록하기
    boolean pokeExpLogAdd(ExpLogDto expLogDto);

    // 총 경험치 값 가져오기
    String expTotal(int myPokeNo);

    // 내 포켓몬 경험치 기록 최근 20개 가져오기
    List<ExpLogDto> expLogPrint();


}
