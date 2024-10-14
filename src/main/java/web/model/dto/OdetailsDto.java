package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OdetailsDto {
    int odetail_no;
    int order_status;
    int product_no;
    int order_no;
}
