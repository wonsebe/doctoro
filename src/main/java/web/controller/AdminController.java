package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.ShopDto;
import web.service.AdminService;

import java.util.ArrayList;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired private AdminService adminService;

    //Read
    @GetMapping("/main")
    public ArrayList<ShopDto> getMainShop(ShopDto shopDto) {
        return adminService.getMainShop(shopDto);
    }
    //Update
}
