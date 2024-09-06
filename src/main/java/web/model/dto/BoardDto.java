package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardDto {
    private int bno;
    private String btitle;
    private String bcontent;
    private String bdate;
    private int uno;
    private int categoryno;
}
