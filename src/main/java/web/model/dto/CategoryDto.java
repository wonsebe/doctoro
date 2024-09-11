package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CategoryDto {
    private int categoryno;     // 카테고리 번호
    private String categoryname; // 카테고리 이름
}
