package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ProductDao;
import web.model.dto.ProductDto;

import java.util.ArrayList;

@Service
public class ProductService {
    @Autowired private ProductDao productDao;

    // 상품 전체 조회
    public ArrayList<ProductDto> productAllPrint() {
        System.out.println("ProductService.productAllPrint");
        return productDao.productAllPrint();
    }

    // 상품 개별 조회
    public ProductDto productDetaillPrint(int productNo) {
        System.out.println("ProductService.productDetaillPrint");
        return productDao.productDetaillPrint(productNo);
    }

}
