package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PcategoryDto {
    private int pcategory_no;           // 상품 번호
    private String pcategory_name;      // 상품 이름
}
