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

    // 주문 등록 (상품 구매) / productNum : 상품 구매 수량
    public boolean orderAdd(int product_no, int productNum) {
        System.out.println("OrderService.orderAdd");
        System.out.println("product_no = " + product_no);
        System.out.println("productNum = " + productNum);

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        
        OrdersDto ordersDto = OrdersDto.builder()
                .uno(loginDto.getUno())     // 유저 번호
                .product_no(product_no)     // 상품 번호
                .build();
        orderDao.orderAdd(ordersDto);        // 주문 테이블에 레코드 등록 / 등록한 레코드의 주문번호 가져와서 ordersDto에 저장
        // ordersDto.setOrder_no(orderDao.orderAdd(ordersDto)); 를 하면 주문 번호가 제대로 들어가는 게 아닌 1이 들어감.
        // setter를 자동으로 해줘서 여기서는 위처럼 해주지 않아도 된다

        System.out.println("주문 테이블에 등록 완료");
        System.out.println("ordersDto = " + ordersDto);

        boolean oDetailResult = orderDetailAdd(ordersDto, productNum);      // 주문 상세 등록 함수 호출
        if (false == oDetailResult) {   // 주문 상세 등록 실패 시
            return false;
        }


        return true;    // 고치기
    }

    // 주문 상세 등록 / productNum : 상품 구매 수량
    public boolean orderDetailAdd(OrdersDto ordersDto, int productNum) {
        System.out.println("OrderService.orderDetailAdd");
        System.out.println("ordersDto = " + ordersDto);
        boolean result = false;

        // 상품 구매 수량만큼 DB에 레코드 등록
        for (int i = 0; i < productNum; i++) {
            result = orderDao.orderDetailAdd(ordersDto);

            if (false == result) {
                break;
            }
        }
        return result;
    }

}
