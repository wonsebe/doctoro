package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.CartDto;
import web.model.dto.ProductDto;

import java.util.ArrayList;

@Mapper
public interface CartDao {

    // 장바구니 등록 (동일한 상품이 장바구니에 존재하지 않은 경우)
    boolean cartAdd(CartDto cartDto);

    // 장바구니 등록/수정 (동일한 상품이 장바귀니에 존재하여 원래 등록돼있는 것을 수량만 수정 / 수량 변경)
    boolean cartAddUpdate(CartDto cartDto);

    // 해당 상품이 장바구니에 존재하는지 체크
    CartDto cartCheck(CartDto cartDto);

    // 장바구니 출력
    ArrayList<ProductDto> cartPrint(int loginUno);

    // 장바구니 항목 삭제
    boolean cartDelete(CartDto cartDto);


}
