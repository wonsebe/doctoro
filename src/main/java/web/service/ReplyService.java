package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.CommentplyDao;
import web.model.dao.ReplyDao;
import web.model.dto.ReplyDto;

import java.util.List;

@Service
public class ReplyService {
    @Autowired
    private ReplyDao replyDao;
    @Autowired private UserService userService;

    //대댓글 등록
    public boolean rWrite(ReplyDto replyDto){
        System.out.println("replyDao = " + replyDao);
        System.out.println("ReplyService.rWrite");
        return replyDao.rWrite(replyDto);
    }
    //대댓글 출력
    public List<ReplyDto>rPrint(int cno){
        System.out.println("ReplyService.rPrint");
        System.out.println("cno = " + cno);
        return replyDao.rPrint(cno);
    }

//    //대댓글 수정
//    public boolean rUpdate(String rcontent){
//        System.out.println("rcontent = " + rcontent);
//        System.out.println("ReplyService.rUpdate");
//        return replyDao.rUpdate(rcontent);
//    }

    //대댓글 삭제
    public boolean rDelete(int rno){
        System.out.println("ReplyService.rDelete");
        System.out.println("rno = " + rno);
        return replyDao.rDelete(rno);
    }

}
