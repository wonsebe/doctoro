package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PointDto {
    private int point_no;               // 포인트 로그 번호
    private int point_indecrease;       // 포인트 증감
    private String point_date;          // 포인트 날짜
    private String free_paid;           // 무료/유료 구분
    private String point_reason;        // 포인트 사유
    private int uno;                    // 유저 번호

}
