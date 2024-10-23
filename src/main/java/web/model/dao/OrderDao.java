package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.OrdersDto;

import java.util.ArrayList;

@Mapper
public interface OrderDao {

    // 주문내역 출력
    public ArrayList<OrdersDto> orderPrint(int loginUno);

}
