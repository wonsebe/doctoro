package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.CartDto;
import web.model.dto.ProductDto;

import java.util.ArrayList;

@Mapper
public interface CartDao {

    // 장바구니 등록
    boolean cartAdd(CartDto cartDto);

    // 장바구니 출력
    public ArrayList<ProductDto> cartPrint(int loginUno);

    // 장바구니 항목 삭제
    public boolean cartDelete(CartDto cartDto);


}
