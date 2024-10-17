package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class DeliveryDto {
    int delivery_no;
    String delivery_status;
    String delivery_date;
    int order_no;

}
