package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.CommentDto;
import web.service.CommetnplyService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/comment")
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
    public List<CommentDto> cPrint(int bno){
        System.out.println("commetnplyService = " + commetnplyService);
        System.out.println("ComentplyController.cPrint");
        return commetnplyService.cPrint(bno);

    }
}
