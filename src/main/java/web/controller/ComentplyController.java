package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.CommentDto;
import web.service.CommetnplyService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/coment")
public class ComentplyController {
    @Autowired private CommetnplyService commetnplyService;


    //댓글 쓰기 처리
    @PostMapping("/comentb")
    public boolean coment(CommentDto commentDto){
        System.out.println("commentDto = " + commentDto);
        System.out.println("BoardController.coment");
        return commetnplyService.coment(commentDto);
    }

    //댓글 출력
    @GetMapping("/cprint")
    public List<CommentDto> cPrint(){
        System.out.println("commetnplyService = " + commetnplyService);
        System.out.println("ComentplyController.cprint");
        return commetnplyService.cPrint();
    }

    //댓글 수정
    public boolean cUpdate(CommentDto commentDto){
        System.out.println("commentDto = " + commentDto);
        System.out.println("ComentplyController.cUpdate");
        return  commetnplyService.cUpdate(commentDto);
    }

    //댓글 삭제
}
