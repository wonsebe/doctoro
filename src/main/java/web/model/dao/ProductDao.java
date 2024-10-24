package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ProductDto;

import java.util.ArrayList;

@Mapper
public interface ProductDao {
    // 상품 전체 조회
    ArrayList<ProductDto> productAllPrint();

    // 상품 개별 조회
    ProductDto productDetaillPrint(int productNo);

}
