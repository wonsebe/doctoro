package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ShopDto;

import java.util.ArrayList;

@Mapper
public interface ShopDao {

    ArrayList<ShopDto> getMainShop(ShopDto shopDto);
}
