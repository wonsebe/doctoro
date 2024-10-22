package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.OrdersDto;
import web.service.OrderService;

import java.util.ArrayList;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired private OrderService orderService;

    // 주문내역 출력
    @GetMapping("/print")
    public ArrayList<OrdersDto> orderPrint() {
        System.out.println("OrderController.orderPrint");
        return orderService.orderPrint();
    }

    // 주문 등록 (상품 구매)



}
