package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.ShopDto;
import web.service.ShopService;

import java.util.ArrayList;

@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired private ShopService shopService;

    //Read
    @GetMapping("/main")
    public ArrayList<ShopDto> getMainShop(ShopDto shopDto) {
        return shopService.getMainShop(shopDto);
    }
    //Update
}
