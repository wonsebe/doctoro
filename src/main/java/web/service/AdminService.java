package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.AdminDao;
import web.model.dto.*;

import java.util.ArrayList;

@Service
public class AdminService {

    @Autowired private AdminDao adminDao;

    public ArrayList<ProductDto> getMainShop(ProductDto productDto)
    {return adminDao.getMainShop(productDto);}

    public boolean add (ProductDto productDto)
    {return adminDao.add(productDto);}

    public boolean del (ProductDto productDto)
    {return adminDao.del(productDto);}

    public ArrayList<ProductDto> prtpoint(PointDto pointDto)
    {return adminDao.prtpoint(pointDto);}

    public boolean addpoint (PointDto pointDto)
    {return adminDao.addpoint(pointDto);}

    public ArrayList<UserDto> user(UserDto userDto)
    {return adminDao.user(userDto);}

    public ArrayList<InventoryDto> prtproduct(InventoryDto inventoryDto)
    {return adminDao.prtproduct(inventoryDto);}

    public boolean prodadd(InventoryDto inventoryDto)
    {return adminDao.prodadd(inventoryDto);}

    public ArrayList<InventoryDto> prodall(InventoryDto inventoryDto)
    {return adminDao.prodall(inventoryDto);}

    public ArrayList<OrdersDto> orderall(OrdersDto ordersDto)
    {return adminDao.orderall(ordersDto);}

    public ArrayList<OrdersDto> delivery(DeliveryDto deliveryDto)
    {return adminDao.delivery(deliveryDto);}

    public boolean change (int odetail_no)
    {return adminDao.change(odetail_no);}

    public boolean delete (int product_no)
    {return adminDao.delete(product_no);}

    public ArrayList<UserDto> userall(UserDto userDto)
    {return adminDao.userall(userDto);}

    public ArrayList<Report_userDto> userreport(Report_userDto report_userDto)
    {return adminDao.userreport(report_userDto);}


}
