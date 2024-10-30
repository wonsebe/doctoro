package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.OrdersDto;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface OrderDao {

    // 주문내역 출력
    ArrayList<OrdersDto> orderPrint(int loginUno);

    // 주문 등록 (상품 구매)
    int orderAdd(OrdersDto ordersDto);

    // 주문 상세 등록
    boolean orderDetailAdd(OrdersDto ordersDto);

    // 주문내역 상위 5개 조회 (챗봇용)
    List<OrdersDto> order_select_five(OrdersDto ordersDto);
    // 주문 상세 내역 출력
    ArrayList<OrdersDto> orderDetailPrint(OrdersDto ordersDto);

}
