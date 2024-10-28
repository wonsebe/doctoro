package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.OrdersDto;

import java.util.ArrayList;

@Mapper
public interface OrderDao {

    // 주문내역 출력
    ArrayList<OrdersDto> orderPrint(int loginUno);

    // 주문 등록 (상품 구매)
    int orderAdd(OrdersDto ordersDto);

    // 주문 상세 등록
    boolean orderDetailAdd(OrdersDto ordersDto);


}
