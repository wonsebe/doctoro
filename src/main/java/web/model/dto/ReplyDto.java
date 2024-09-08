package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReplyDto {
    private int rno;            // 대댓글 번호
    private String rcontent;    // 내용
    private String rdate;       // 대댓글 등록 날짜/시간
    private int cno;            // 댓글 번호
    private int uno;            // 유저 번호
}
