package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import web.model.dao.BoardDao;
import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;
import web.model.dto.UserDto;

import java.util.List;

@Service
public class BoardService {
    @Autowired private BoardDao boardDao;
    @Autowired private UserService userService;
    //#################게시판 관련#################//
    //게시판 등록 (uno 넣기)
    public boolean bWrite(BoardDto boardDto){
            //회원의 로그인회원번호 구하기
        //1. 로그인 세션에서 값 호출
        Object object=userService.userLoginCheck();
        if (object ==null)return false; //비로그인시 함수 강제종료/취소
        //2. 세션 내 회원번호 속성 호출
        UserDto memberDto=(UserDto)object;
        //3. 속성 호출
        int loginNo=memberDto.getUno();
        //4. BoardDto 에 담아주기
        boardDto.setUno(loginNo);
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardService.bWrite");

        return boardDao.bWrite(boardDto);
    }
    //게시판 출력
    public List<BoardDto> bPrint(BoardPageDto boardPageDto){
        System.out.println("boardPageDto = " + boardPageDto);
        System.out.println("BoardService.bPrint");
        // - 만약에 페이지번호가 매개변수로 존재하지 않으면 1페이지로 설정
        if (boardPageDto.getPage()==0){boardPageDto.setPage(1);}
        //1. 하나의 페이지당 표시할 게시물 수
        int pageBoardSize=10; //5개씩
        //2. 페이지당 게시물을 출력할 시작레코드 번호
        int startRow=( boardPageDto.getPage()-1)* pageBoardSize;

//        //전체 게시물 수 : 조건추가) 카테고리번호 별, 조건 추가) 검색 조건
//        int totalBoardSize= boardDao.getTotalBoardSize();
//        //전체 페이지 수 구하기
//        int totalPage=  totalBoardSize % pageBoardSize == 0?
//                        totalBoardSize/pageBoardSize :
//                        totalBoardSize/pageBoardSize +1;
//
//        int btnSize=5;
//        int startBtn=( (boardPageDto.getPage()-1)/btnSize)*btnSize +1; //페이지별 시작 버튼 번호 변수
//        int endBtn= startBtn+btnSize-1; //페이지별 끝버튼 번호 변수
//        if (endBtn > totalPage) endBtn=totalPage; //만일 끝 번호가 마지막 페이지보다 커질 수 없다.

        return boardDao.bPrint(boardPageDto);
    }

    //게시판 개별출력
    public BoardDto bDetail(int bno){
        System.out.println("BoardService.bDetail");
        return boardDao.bDetail(bno);}

    //게시판 수정
    public boolean bUpdate(BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardService.bUpdate");
        return boardDao.bUpdate(boardDto);
    }

    //게시판 삭제
    public boolean bDelete(BoardDto boardDto){
       System.out.println("BoardService.bDelete");
        return boardDao.bDelete(boardDto);
    }

    //################################################//
    //카테고리 출력
    public List<BoardDto>categoryprint(){
        return boardDao.categoryprint();
    }

}
