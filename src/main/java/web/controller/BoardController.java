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
    BoardService boardService;

    //#################게시판 관련#################//
    //게시판 등록
    @PostMapping("/write")
    public boolean bWrite(BoardDto boardDto){
        return boardService.bWrite(boardDto);
    }
    //게시판 출력
    @GetMapping("/print")
    public List<BoardDto> bPrinte(){
        return boardService.bPrinte();
    }
    //게시판 개별조회
    @GetMapping("/detail")
    public List<BoardDto> bDetail(){
        return boardService.bDetail();
    }
    //게시판 수정
    @PutMapping("/update")
    public boolean bUpdate(BoardDto boardDto){
        return boardService.bUpdate(boardDto);
    }
    //게시판 삭제
    @DeleteMapping("/delete")
    public boolean bDelete(BoardDto boardDto){
        return boardService.bDelete(boardDto);
    }
    //############################################//

}
