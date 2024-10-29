package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.DeliveryDao;
import web.model.dto.DeliveryDto;

@Service
public class DeliveryService {
    @Autowired private DeliveryDao deliveryDao;

    // 상품 주문 시 배송 테이블에 레코드 등록
    public boolean deliveryAdd(DeliveryDto deliveryDto) {
        System.out.println("DeliveryService.deliveryAdd");
        System.out.println("deliveryDto = " + deliveryDto);
        return deliveryDao.deliveryAdd(deliveryDto);
    }


}
