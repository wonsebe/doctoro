package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.MyPokemonDto;

@Mapper
public interface MyPokemonDao {

    // 내 포켓몬 존재 유무
    MyPokemonDto MyPokeExistCheck(int loginUno);


}
