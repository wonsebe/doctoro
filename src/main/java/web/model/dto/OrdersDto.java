package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OrdersDto {
    private int order_no;               // 주문 번호
    private String order_date;          // 주문일
    private int uno;                    // 유저 번호

    private int odetail_no;             // 주문 상세 번호
    private int order_status;           // 주문 상태
    private int product_no;             // 상품 번호

    private String product_name;        // 상품명
    private int price;                  // 상품 가격
    private String product_image;       // 상품 이미지

    private String name;                // 유저 이름

}
