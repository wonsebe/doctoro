package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    // ===================== [1] 레이아웃 ===================== //
    @GetMapping("/")
    public String index(){ return "/index.html";}


    // ===================== [3] 게시판관련 ===================== //
    //게시판 등록 페이지 요청
    @GetMapping("/board/bwrite")
    public String boardWrite(){return  "/board/write.html";}

    //게시판 전체 출력 페이지 요청
    @GetMapping("/board/bprint")
    public String boardPrint(){return  "/board/board.html";}

    //게시판 상세페이지 요청
    @GetMapping("/board/detail")
    public String boardDetail(){return  "/board/detail.html";}

}
