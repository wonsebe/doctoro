package web.service;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import web.model.dao.BoardDao;
import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;
import web.model.dto.CommentDto;
import web.model.dto.UserDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardService {
    @Autowired
    private BoardDao boardDao;
    @Autowired
    private UserService userService;

    //#################게시판 관련#################//
    //게시판 등록
    public boolean bWrite(BoardDto boardDto) {
        //회원의 로그인회원번호 구하기
        //1. 로그인 세션에서 값 호출
        Object object = userService.userLoginCheck();
        if (object == null) return false; //비로그인시 함수 강제종료/취소
        //2. 세션 내 회원번호 속성 호출
        UserDto memberDto = (UserDto) object;
        //3. 속성 호출
        int loginNo = memberDto.getUno();
        //4. BoardDto 에 담아주기
        boardDto.setUno(loginNo);
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardService.bWrite");
        //회원의 로그인회원번호 구하기
        //1. 로그인 세션에서 값 호출
        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) { // 비로그인이라면 리턴
            return false;
        }
        int uno = loginDto.getUno();
        //4. BoardDto 에 담아주기
        boardDto.setUno(uno);
        return boardDao.bWrite(boardDto);
    }

    //게시판 출력
    public BoardPageDto bPrint(BoardPageDto boardPageDto) {
        //만약에 페이지번호가 매개변수로 존재하지 않으면 1페이지로 설정
        if (boardPageDto.getPage() == 0) {
            boardPageDto.setPage(1);  // 1페이지로 초기화
        }
        //1. 하나의 페이지당 표시할 게시물 수
        int pageBoardSize = 10;
        //2. 페이지당 게시물을 출력할 시작레코드 번호
        int startRow = (boardPageDto.getPage() - 1) * pageBoardSize;


        Map<String, Object> params = new HashMap<>();
        params.put("startRow", startRow);
        params.put("pageBoardSize", pageBoardSize);
        params.put("categoryno", boardPageDto.getCategoryno());
        params.put("searchKey", boardPageDto.getSearchKey());
        params.put("searchKeyWord", boardPageDto.getSearchKeyWord());

        //카테고리별 검색조건
        int totalBoardSize = boardDao.getTotalBoardSize(params);

        //4. 전체 게시물 수 구하기
        int totalPage = totalBoardSize % pageBoardSize == 0 ?
                totalBoardSize / pageBoardSize :
                totalBoardSize / pageBoardSize + 1;

        int btnSize = 5; //페이지당 최대 버튼수를 5개씩 표기한다는 가정
        int startBtn = ((boardPageDto.getPage() - 1) / btnSize) * btnSize + 1; //페이지별 시작 버튼 번호 변수
        int endBtn = startBtn + btnSize - 1;
        if (endBtn >= totalPage) endBtn = totalPage; //만일 끝 번호가 마지막페이지 보다 커질 수 없다.

        //게시물 정보 조회
        List<BoardDto> data = boardDao.bPrint(params);

        // 반환 객체 구성
        BoardPageDto pageDto = BoardPageDto.builder()
                .page(boardPageDto.getPage()) // 1. 현재 페이지 번호
                .totalBoardSize(totalBoardSize) // 2. 전체 게시물수
                .totalPage(totalPage) // 3. 전체 페이지수
                .data(data) // 4. 조회된 게시물 정보 목록/리스트
                .startBtn(startBtn) // 5. 페이지별 시작버튼 번호
                .endBtn(endBtn) // 6. 페이지별 끝버튼 번호
                .build();

        return pageDto;
    }

    //게시판 개별출력
    public BoardDto bDetail(int bno) {
        System.out.println("BoardService.bDetail");


        //조회수 증가 처리
        boardDao.bView(bno);
        return boardDao.bDetail(bno);
    }

    //게시판 수정
    public boolean bUpdate(BoardDto boardDto) {
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardService.bUpdate");
        return boardDao.bUpdate(boardDto);
    }

    //게시판 삭제
    public boolean bDelete(BoardDto boardDto) {
        System.out.println("BoardService.bDelete");
        return boardDao.bDelete(boardDto);
    }

    //카테고리 출력
    public List<BoardDto> categoryprint() {
        return boardDao.categoryprint();
    }

    //게시판 단어 빈도수 출력
    public List<BoardDto> boardCount(){
        return  boardDao.boardCount();
    }

}
