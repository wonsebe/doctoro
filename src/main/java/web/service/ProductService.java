package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ProductDao;
import web.model.dto.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    @Autowired private ProductDao productDao;

    // 상품 전체 조회
    public ProductPageDto productAllPrint(ProductPageDto productPageDto) {
        System.out.println("ProductService.productAllPrint");
        System.out.println("productPageDto = " + productPageDto);

        // 만약에 페이지번호가 매개변수로 존재하지 않으면 1페이지로 설정
        if (productPageDto.getPage() == 0) {
            productPageDto.setPage(1);      // 1페이지로 초기화
        }

        // 하나의 페이지당 표시할 게시물 수
        int pageProductSize = 32;

        // 페이지당 게시물을 출력할 시작레코드 번호
        int startRow = (productPageDto.getPage() - 1) * pageProductSize;

        Map<String, Object> params = new HashMap<>();
        params.put("startRow", startRow);
        params.put("pageProductSize", pageProductSize);
        params.put("pcategory_no", productPageDto.getPcategory_no());
        params.put("pSearchKey", productPageDto.getPSearchKey());
        params.put("pSearchKeyWord", productPageDto.getPSearchKeyWord());

        // 카테고리별 검색조건
        int totalProductSize = productDao.getTotalProductSize(params);

        // 전체 상품 수 구하기
        int totalPage = totalProductSize % pageProductSize == 0 ?
                totalProductSize / pageProductSize :
                totalProductSize / pageProductSize + 1;

        int btnSize = 5;    //페이지 당 최대 버튼 수를 5개씩 표기하겠다
        int startBtn = ((productPageDto.getPage() - 1) / btnSize) * btnSize + 1;    // 페이지별 시작 버튼 번호 변수
        int endBtn = startBtn + btnSize - 1;
        if (endBtn >= totalPage) endBtn = totalPage;    // 끝 번호는 마지막 페이지 보다 커질 수 없다

        // 상품 전체 출력
        ArrayList<ProductDto> productData = productDao.productAllPrint(params);

        // 반환 객체 구성
        ProductPageDto pageDto = ProductPageDto.builder()
                .page(productPageDto.getPage()) // 1. 현재 페이지 번호
                .totalProductSize(totalProductSize) // 2. 전체 게시물수
                .totalPage(totalPage)       // 3. 전체 페이지수
                .productData(productData)       // 4. 조회된 게시물 정보 목록/리스트
                .startBtn(startBtn)             // 5. 페이지별 시작버튼 번호
                .endBtn(endBtn)             // 6. 페이지별 끝버튼 번호
                .build();

        return pageDto;
    }

    // 상품 개별 조회
    public ProductDto productDetaillPrint(int productNo) {
        System.out.println("ProductService.productDetaillPrint");
        return productDao.productDetaillPrint(productNo);
    }

    // 상품 카테고리 출력
    public ArrayList<PcategoryDto> pCategoryPrint() {
        System.out.println("ProductService.pCategoryPrint");
        return productDao.pCategoryPrint();
    }

}
