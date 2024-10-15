package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.ProductDto;
import web.service.AdminService;

import java.util.ArrayList;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired private AdminService adminService;

    //Read
    @GetMapping("/main")
    public ArrayList<ProductDto> getMainShop(ProductDto productDto) {
        return adminService.getMainShop(productDto);
    }
    //Update
}
