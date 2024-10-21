package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.CartDto;

@Mapper
public interface CartDao {

    // 장바구니 등록
    boolean cartAdd(CartDto cartDto);

}
