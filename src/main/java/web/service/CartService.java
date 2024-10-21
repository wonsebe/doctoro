package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.CartDao;
import web.model.dto.CartDto;
import web.model.dto.UserDto;

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

        return cartDao.cartAdd(cartDto);
    }


}
