package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class DeliveryDto {
    int delivery_no;                // 배송 번호
    String delivery_status;         // 배송 상태
    String delivery_date;           // 배송 시작 날짜
    int order_no;                   // 주문 번호

}
