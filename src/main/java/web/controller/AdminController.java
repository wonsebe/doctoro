package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.PointDto;
import web.model.dto.ProductDto;
import web.model.dto.UserDto;
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
    @PostMapping("/invadd")
    public boolean add (ProductDto productDto)
    {return adminService.add(productDto);}

    //포인트 로그 출력
    @GetMapping("/prtpoint")
    public ArrayList<ProductDto> prtpoint(PointDto pointDto){
        return adminService.prtpoint(pointDto);}

    //포인트 지급
    @PostMapping("/addpoint")
    public boolean addpoint (PointDto pointDto)
    {return adminService.addpoint(pointDto);}

    //유저 조회
    @GetMapping("/user")
    public ArrayList<UserDto> user(UserDto userDto)
    {return adminService.user(userDto);}
}
