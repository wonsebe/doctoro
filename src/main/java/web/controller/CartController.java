package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.CartDto;
import web.model.dto.ProductDto;
import web.service.CartService;

import java.util.ArrayList;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired private CartService cartService;

    // 장바구니 등록
    @PostMapping("/add")
    public boolean cartAdd(CartDto cartDto) {
        System.out.println("CartController.cartAdd");
        System.out.println("cartDto = " + cartDto);
        return cartService.cartAdd(cartDto);
    }

    // 장바구니 출력
    @GetMapping("/print")
    public ArrayList<ProductDto> cartPrint() {
        System.out.println("CartController.cartPrint");
        return cartService.cartPrint();
    }

    // 장바구니 항목 삭제
    @DeleteMapping("/delete")
    public boolean cartDelete(int productNo) {
        System.out.println("CartController.cartDelete");
        return cartService.cartDelete(productNo);
    }




}
