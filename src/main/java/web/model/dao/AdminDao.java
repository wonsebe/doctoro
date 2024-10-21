package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.*;

import java.util.ArrayList;

@Mapper
public interface AdminDao {

    ArrayList<ProductDto> getMainShop(ProductDto productDto);

    boolean add (ProductDto productDto);

    boolean del (ProductDto productDto);

    ArrayList<ProductDto> prtpoint(PointDto pointDto);

    boolean addpoint (PointDto pointDto);

    ArrayList<UserDto> user(UserDto userDto);

    ArrayList<InventoryDto> prtproduct(InventoryDto inventoryDto);

    boolean prodadd(InventoryDto inventoryDto);

    ArrayList<InventoryDto> prodall(InventoryDto inventoryDto);

    ArrayList<OrdersDto> orderall(OrdersDto ordersDto);

    ArrayList<OrdersDto> delivery(DeliveryDto deliveryDto);

    boolean change (int odetail_no);

    boolean delete (int product_no);

    ArrayList<UserDto> userall(UserDto userDto);

    ArrayList<Report_userDto> userreport(Report_userDto report_userDto);

    ArrayList<Report_userDto> reportcount(Report_userDto report_userDto);
}
