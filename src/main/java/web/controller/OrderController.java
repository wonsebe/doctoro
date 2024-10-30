package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.OrdersDto;
import web.service.OrderService;

import java.util.ArrayList;
import java.util.List;

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

    // 주문 등록 (상품 구매) / product_no : 상품 번호 / productNum : 상품 구매 수량 / totalPrice : 총 결제 금액 / pcategory_name : 상품 카테고리명
    @PostMapping("/add")
    public boolean orderAdd(int product_no, int productNum, int totalPrice, String pcategory_name) {
        System.out.println("OrderController.orderAdd");
        return orderService.orderAdd(product_no, productNum, totalPrice, pcategory_name);
    }

    // 주문 번호 기준 같은 상품 개수 구하기
    @GetMapping("/product/sum")
    public ArrayList<OrdersDto> orderProductSum() {
        System.out.println("OrderController.orderProductSum");
        return orderService.orderProductSum();
    }

    // 주문 등록 (상품 구매) - 장바구니
    @PostMapping("/add/cart")
    public boolean orderCartAdd() {
        System.out.println("OrderController.orderAdd");
        return orderService.orderCartAdd();
    }

    // 주문 상세 출력 5개 (챗봇용
    @GetMapping("/select_five")
    public List<OrdersDto> order_select_five(OrdersDto ordersDto){
        return orderService.order_select_five(ordersDto);
    }

    // 주문 상세 내역 출력
    @GetMapping("/print/detail")
    public ArrayList<OrdersDto> orderDetailPrint(OrdersDto ordersDto) {
        System.out.println("OrderController.orderDetailPrint");
        System.out.println("ordersDto = " + ordersDto);
        return orderService.orderDetailPrint(ordersDto);
    }

}
