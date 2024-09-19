package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CommentDto {
    private int cno;            // 댓글 번호
    private String ccontent;    // 내용
    private String cdate;       // 댓글 등록 날짜/시간
    private int bno;            // 게시글 번호
    private int uno;            // 유저 번호
    private int rno;           //대댓글 번호
    private String id;  //유저 아이디
}
