package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PointDto {
    int point_no;
    int point_indecrease;
    String point_date;
    String free_paid;
    String point_reason;
    int uno;
    String name;
}
