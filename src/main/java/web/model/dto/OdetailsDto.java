package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class OdetailsDto {
    private int odetail_no;
    private int order_status;
    private int product_no;
    private int order_no;
}
