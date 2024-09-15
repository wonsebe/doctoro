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
    private int page; // 1. 현재 페이지 번호
    // (지역/매개) 변수 와 필드 차이점 : 초기값의 차이
    private int totalBoardSize; // 2. 전체 게시물수
    private int totalPage; // 3. 전체 페이지수
    private List<BoardDto> data; // 4. 조회된 게시물 정보 목록/리스트
    private int categoryno; //5.현재 카테고리 번호
    private int startBtn; //6.페이지별 시작버튼
    private int endBtn; //7.페이지별 끝버튼

    //+검색
    private String searchKey;   // 검색 조회시 사용되는 필드명
    private String searchKeyWord;//검색조회시 사용되는 필드의 값

}
