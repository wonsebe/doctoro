package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OrdersDto {
    int order_no;
    String order_date;
    int uno;
}
