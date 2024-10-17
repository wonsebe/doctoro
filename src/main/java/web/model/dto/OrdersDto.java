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
    int order_status;
    int product_no;


    int odetail_no;
    String name;
    String product_name;

}
