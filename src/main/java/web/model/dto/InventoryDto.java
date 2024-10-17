package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class InventoryDto {
    int inventory_no; //재고 번호
    int inventory_indecrease; //증감수량
    String inventory_date; //증감 날짜
    String inventory_reason; //증감사유
    int product_no; //참조키
    String product_name; //참조하는 상품의 이름
    int product_count; //재고 수량 체크용
}
