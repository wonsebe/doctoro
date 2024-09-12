package web.model.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BoardPageDto {
    private int page; //현재 페이지 번호
    private int totalPage; // 전체 페이지 수
    private List<BoardDto> data; //조회된 게시물 정보 목록/리스트
    private int startBtn; //페이지별 시작버튼 번호
    private int endBtn; //페이지별 끝버튼 번호
    private int categoryno; //현재 카테고리 번호
    //+검색
    private String searchKey;
    private String searchKeyWord;
}
