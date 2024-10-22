package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductDto {
    private int product_no;
    private String product_name;
    private int price;
    private String product_image;
    private String product_description;
    private int pcategory_no;

    private String pcategory_name;          // 상품 카테고리명
    private int cart_product_quantity;      // 장바구니에 담은 상품 수량
}
