package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.MyPokemonDto;

@Mapper
public interface MyPokemonDao {

    // 내 포켓몬 존재 유무
    MyPokemonDto myPokeExistCheck(int loginUno);

    // 내 포켓몬 생성
    boolean myPokeAdd(int loginUno);

    // 내 포켓몬 초기화
    boolean myPokeReset(int loginUno);

    // 내 포켓몬 진화
    boolean myPokeEvolve(MyPokemonDto myPokemonDto);


}
