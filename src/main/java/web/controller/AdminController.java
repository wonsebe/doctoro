package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.*;
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

    //Delte
    @DeleteMapping("/invdel")
    public boolean del (ProductDto productDto)
    {return adminService.del(productDto);}

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

    //재고 관리
    //재고 조회
    @GetMapping("/product")
    public ArrayList<InventoryDto> prtproduct(InventoryDto inventoryDto)
    {return adminService.prtproduct(inventoryDto);}
    //재고 추가
    @PostMapping("/prodadd")
    public boolean prodadd(InventoryDto inventoryDto)
    {return adminService.prodadd(inventoryDto);}
    //재고별 보유
    @GetMapping("/prodall")
    public ArrayList<InventoryDto> prodall(InventoryDto inventoryDto)
    {return adminService.prodall(inventoryDto);}
    //주문 전체조회
    @GetMapping("/orderall")
    public ArrayList<OrdersDto> orderall(OrdersDto ordersDto)
    {return adminService.orderall(ordersDto);}

    //배송 전체 조회
    @GetMapping("/delivery")
    public ArrayList<OrdersDto> delivery(DeliveryDto deliveryDto)
    {return adminService.delivery(deliveryDto);}
    //배송 상태 변경
    @PutMapping("/change")
    public boolean change (int odetail_no)
    {return adminService.change(odetail_no);}
    //상품 삭제
    @DeleteMapping("/delete")
    public boolean delete (int product_no)
    {return adminService.delete(product_no);}
}
