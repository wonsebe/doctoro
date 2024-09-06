package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CommentDto {
    private int cno;
    private String ccontent;
    private String cdate;
    private int bno;
    private int uno;
}
