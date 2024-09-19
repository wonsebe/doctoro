package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dao.ReplyDao;
import web.model.dto.CommentDto;
import web.model.dto.ReplyDto;
import web.service.ReplyService;

import java.util.List;

@RestController
@RequestMapping("/reply")
public class ReplyController {
    @Autowired private ReplyService replyService;


    //대댓글 쓰기 처리
    @PostMapping("/write")
    public boolean rWrite(ReplyDto replyDto){
        System.out.println("ReplyController.rWrite");
        System.out.println("replyDto = " + replyDto);
        return replyService.rWrite(replyDto);
    }

    //대댓글 출력
    @GetMapping("/print")
    public List<ReplyDto> rPrint(int cno){
        System.out.println("cno = " + cno);
        System.out.println("ReplyController.rPrint");
        return replyService.rPrint(cno);

    }

//    //대댓글 수정
//    @PutMapping("/cupdate")
//    public boolean rUpdate(String rcontent){
//        System.out.println("ReplyController.rUpdate");
//        System.out.println("rcontent = " + rcontent);
//        return  replyService.rUpdate(rcontent);
//    }

    //대댓글 삭제
    @DeleteMapping("/delete")
    public boolean rDelete(int rno){
        return replyService.rDelete(rno);
    }
}
