package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;
import web.model.dto.CommentDto;
import web.service.BoardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    //#################게시판 관련#################//
    //게시판 등록
    @PostMapping("/write")
    public boolean bWrite(BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardController.bWrite");
        return boardService.bWrite(boardDto);
    }
    //게시판 출력
    @GetMapping("/print")
    public BoardPageDto bPrint(BoardPageDto boardPageDto){
        System.out.println("boardService = " + boardService);
        System.out.println("BoardController.bPrint");
        // --- 매개변수
        // 1. page : 페이징 처리 에서 사용할 현재 페이지번호
        // 2. categoryno : 현재 선택된 카테고리 번호
        // 3. searchKey : 검색 조회시 사용되는 필드명
        // 4. searchKeyword : 검색 조회시 사용되는 필드의 값
        return boardService.bPrint(boardPageDto);
    }
    //게시판 개별조회
    @GetMapping("/bdetail")
    public BoardDto bDetail(int bno){
        System.out.println("BoardController.bDetail");
        return boardService.bDetail(bno);
    }
    //게시판 수정
    @PutMapping("/update")
    public boolean bUpdate(BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardController.bUpdate");
        return boardService.bUpdate(boardDto);
    }
    //게시판 삭제
    @DeleteMapping("/delete")
    public boolean bDelete(BoardDto boardDto){

        System.out.println("BoardController.bDelete");
        return boardService.bDelete(boardDto);
    }

    //###############################################################//

    //카테고리 출력
    @GetMapping("/bcategory")
    public List<BoardDto> categoryprint(){
        System.out.println("boardService = " + boardService);
        System.out.println("BoardController.categoryprint");
        return boardService.categoryprint();
    }

    //==============================================================//

    // 단어 빈도수 출력
    @GetMapping("/wordCount")
    public List<BoardDto>boardCount(){
        return boardService.boardCount();
    }


}
