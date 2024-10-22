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

    // 장바구니 수정 (동일한 상품이 장바귀니에 존재하여 원래 등록돼있는 것을 수량만 수정 / 수량 변경)
    @PutMapping("/update")
    public boolean cartAddUpdate(CartDto cartDto) {
        System.out.println("CartController.cartAddUpdate");
        System.out.println("cartDto = " + cartDto);
        return cartService.cartAddUpdate(cartDto);
    }

    // 장바구니 출력
    @GetMapping("/print")
    public ArrayList<ProductDto> cartPrint() {
        System.out.println("CartController.cartPrint");
        return cartService.cartPrint();
    }

    // 장바구니 항목 삭제
    @DeleteMapping("/delete")
    public boolean cartDelete(CartDto cartDto) {
        System.out.println("CartController.cartDelete");
        return cartService.cartDelete(cartDto);
    }




}
