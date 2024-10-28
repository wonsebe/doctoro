package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ItemDto {
    private int item_no;                    // 아이템 번호
    private int item_use;                   // 아이템 사용 여부
    private int uno;                        // 유저 번호
    private int product_no;                 // 상품 번호

    private String product_name;            // 상품명
    private String product_image;           // 상품 이미지
    private String product_description;     // 상품 설명

}
