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

    // 주문 번호 기준 같은 상품 개수 구하기
    ArrayList<OrdersDto> orderProductSum(int loginUno);

    // 주문 상세 내역 출력
    ArrayList<OrdersDto> orderDetailPrint(OrdersDto ordersDto);

}
