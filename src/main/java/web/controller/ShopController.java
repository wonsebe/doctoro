package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.service.ShopService;

@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired private ShopService shopService;

    //Read
    
    //Update
}
