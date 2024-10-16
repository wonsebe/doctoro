package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductDto {
    int product_no;
    String product_name;
    int price;
    String product_image;
    String product_description;
    int pcategory_no;

    String pcategory_name;          // 상품 카테고리명
}
