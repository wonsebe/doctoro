package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductDto {
    private int product_no;                 // 상품 번호
    private String product_name;            // 상품명
    private int price;                      // 상품 가격
    private String product_image;           // 상품 이미지
    private String product_description;     // 상품 설명
    private int pcategory_no;               // 상품 카테고리 번호

    private String pcategory_name;          // 상품 카테고리명
    private int cart_product_quantity;      // 장바구니에 담은 상품 수량
}
