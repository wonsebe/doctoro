package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.PcategoryDto;
import web.model.dto.ProductDto;
import web.model.dto.ProductPageDto;
import web.service.ProductService;

import java.util.ArrayList;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired private ProductService productService;

    // 상품 전체 조회
    @GetMapping("/all/print")
    public ProductPageDto productAllPrint(ProductPageDto productPageDto) {
        System.out.println("ProductController.productAllPrint");
        return productService.productAllPrint(productPageDto);
    }

    // 상품 개별 조회
    @GetMapping("/detail/print")
    public ProductDto productDetaillPrint(int productNo) {
        System.out.println("ProductController.productDetaillPrint");
        return productService.productDetaillPrint(productNo);
    }

    // 상품 카테고리 출력
    @GetMapping("/category/print")
    public ArrayList<PcategoryDto> pCategoryPrint() {
        System.out.println("ProductController.pCategoryPrint");
        return productService.pCategoryPrint();
    }


}
