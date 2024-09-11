package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.BoardDto;
import web.service.BoardService;

import java.util.List;

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
    public List<BoardDto> bPrint(){
        System.out.println("boardService = " + boardService);
        System.out.println("BoardController.bPrint");
        return boardService.bPrint();
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
}
