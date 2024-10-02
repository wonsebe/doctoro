package web.model.dao;

import org.apache.ibatis.annotations.Lang;
import org.apache.ibatis.annotations.Mapper;
import web.model.dto.CommentDto;

import java.util.List;

@Mapper
public interface CommentplyDao {

    //##################댓글관련#######################//
    //댓글 등록
    boolean coment(CommentDto commentDto);

    //댓글 출력
    List<CommentDto> cPrint(int bno);
}

