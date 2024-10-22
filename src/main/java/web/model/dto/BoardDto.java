package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardDto {
    private int bno;            // 게시글 번호
    private String btitle;      // 제목
    private String bcontent;    // 내용
    private String bdate;       // 글 등록 날짜/시간
    private int bview;
    private int uno;            // 유저 번호
    private int categoryno;     // 카테고리 번호
    private String categoryname;
    private String id;

    //김병찬관리자용
    String name; //작성자 이름
    int rno;//신고당한 횟수

}
