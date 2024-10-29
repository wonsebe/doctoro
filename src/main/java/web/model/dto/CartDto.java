package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CartDto {
    private int cart_no;                    // 장바구니 번호
    private int cart_product_quantity;      // 장바구니에 담은 상품 수량
    private int product_no;                 // 상품 번호
    private int uno;                        // 유저 번호

    private String product_name;    // product 테이블 참조용 제품 이름
    private String price;           // product 테이플 참조용 가격


}
