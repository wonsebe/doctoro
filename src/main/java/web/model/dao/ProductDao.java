package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.PcategoryDto;
import web.model.dto.ProductDto;

import java.util.ArrayList;
import java.util.Map;

@Mapper
public interface ProductDao {

    // 상품 전체 조회
    ArrayList<ProductDto> productAllPrint(Map<String, Object> params);

    // 전체 상품 수 구하기
    int getTotalProductSize(Map<String, Object> params);

    // 상품 개별 조회
    ProductDto productDetaillPrint(int productNo);

    // 상품 카테고리 출력
    ArrayList<PcategoryDto> pCategoryPrint();

}
