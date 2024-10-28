package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.DeliveryDto;

@Mapper
public interface DeliveryDao {

    // 상품 주문 시 배송 테이블에 레코드 등록
    public boolean deliveryAdd(DeliveryDto deliveryDto);

}
