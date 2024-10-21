package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.CartDto;
import web.service.CartService;

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





}
