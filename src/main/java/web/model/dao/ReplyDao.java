package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.CommentDto;
import web.model.dto.ReplyDto;

import java.util.List;

@Mapper
public interface ReplyDao {

    boolean rWrite(ReplyDto replyDto);
    List<ReplyDto> rPrint(int cno);
//    boolean rUpdate(String rcontent);
    boolean rDelete(int rno);
}
