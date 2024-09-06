package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReplyDto {
    private int rno;
    private String rcontent;
    private String rdate;
    private int cno;
    private int uno;
}
