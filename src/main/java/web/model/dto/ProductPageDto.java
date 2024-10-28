package web.model.dto;

import lombok.*;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductPageDto {
    private int page;                               // 현재 페이지 번호
    private int totalProductSize;                   // 전체 상품수
    private int totalPage;                          // 전체 페이지수
    private ArrayList<ProductDto> productData;      // 조회된 상품 정보 목록
    private int pcategory_no;                       // 현재 상품 카테고리 번호 pcategory_no
    private int startBtn;                           // 페이지별 시작버튼
    private int endBtn;                             // 페이지별 끝버튼

    //+검색
    private String pSearchKey;          // 상품 검색 조회시 사용되는 필드명
    private String pSearchKeyWord;      // 상품 검색 조회시 사용되는 필드의 값

}
