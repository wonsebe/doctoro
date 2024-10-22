package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.OrderDao;
import web.model.dto.OrdersDto;
import web.model.dto.UserDto;

import java.util.ArrayList;

@Service
public class OrderService {
    @Autowired private OrderDao orderDao;
    @Autowired private UserService userService;

    // 주문내역 출력
    public ArrayList<OrdersDto> orderPrint() {
        System.out.println("OrderService.orderPrint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return orderDao.orderPrint(loginUno);
    }

}
