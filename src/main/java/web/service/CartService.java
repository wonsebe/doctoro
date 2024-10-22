package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.CartDao;
import web.model.dto.CartDto;
import web.model.dto.ProductDto;
import web.model.dto.UserDto;

import java.util.ArrayList;

@Service
public class CartService {
    @Autowired private CartDao cartDao;
    @Autowired private UserService userService;

    // 장바구니 등록
    public boolean cartAdd(CartDto cartDto) {
        System.out.println("CartService.cartAdd");
        System.out.println("cartDto = " + cartDto);

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        cartDto.setUno(loginDto.getUno());
        System.out.println("cartDto = " + cartDto);

        CartDto result = cartCheck(cartDto);         // 장바구니에 추가하고자 하는 상품이 장바구니에 존재하는지 체크
        System.out.println("result = " + result);
        if (result != null) {    // 동일한 상품이 장바귀니에 존재하여 원래 등록돼있는 것을 수량만 수정
            cartDto.setCart_product_quantity(cartDto.getCart_product_quantity() + result.getCart_product_quantity());     // 추가하려는 수량과 기존 수량을 합하기
            return cartAddUpdate(cartDto);
        } else {                 // 동일한 상품이 장바구니에 존재하지 않으면 새로 등록
            return cartDao.cartAdd(cartDto);
        }
    }

    // 장바구니 수정 (동일한 상품이 장바귀니에 존재하여 원래 등록돼있는 것을 수량만 수정 / 수량 변경)
    public boolean cartAddUpdate(CartDto cartDto) {
        System.out.println("CartService.cartAddUpdate");
        System.out.println("cartDto = " + cartDto);

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        cartDto.setUno(loginDto.getUno());
        System.out.println("cartDto = " + cartDto);

        return cartDao.cartAddUpdate(cartDto);
    }

    // 해당 상품이 장바구니에 존재하는지 체크
    public CartDto cartCheck(CartDto cartDto) {
        System.out.println("CartService.cartCheck");
        System.out.println("cartDto = " + cartDto);
        return cartDao.cartCheck(cartDto);
    }

    // 장바구니 출력
    public ArrayList<ProductDto> cartPrint() {
        System.out.println("CartService.cartPrint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return cartDao.cartPrint(loginUno);
    }

    // 장바구니 항목 삭제
    public boolean cartDelete(CartDto cartDto) {
        System.out.println("CartService.cartDelete");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        cartDto.setUno(loginDto.getUno());
        System.out.println("cartDto = " + cartDto);

        return cartDao.cartDelete(cartDto);
    }

}
