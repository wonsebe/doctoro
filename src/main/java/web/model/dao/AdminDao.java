package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.PointDto;
import web.model.dto.ProductDto;
import web.model.dto.UserDto;

import java.util.ArrayList;

@Mapper
public interface AdminDao {

    ArrayList<ProductDto> getMainShop(ProductDto productDto);

    boolean add (ProductDto productDto);

    ArrayList<ProductDto> prtpoint(PointDto pointDto);

    boolean addpoint (PointDto pointDto);

    ArrayList<UserDto> user(UserDto userDto);

}
