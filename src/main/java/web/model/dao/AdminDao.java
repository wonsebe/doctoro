package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ProductDto;

import java.util.ArrayList;

@Mapper
public interface AdminDao {

    ArrayList<ProductDto> getMainShop(ProductDto productDto);
}
