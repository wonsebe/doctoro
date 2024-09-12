package web.model.dao;

import org.apache.ibatis.annotations.Mapper;

import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;

import java.util.List;

@Mapper
public interface BoardDao {





    //#################게시판 관련#################//
    //게시판 등록
    boolean bWrite(BoardDto boardDto);
    //게시판 출력
    List<BoardDto >bPrint(BoardPageDto boardPageDto);
    //게시판 개별출력
    BoardDto bDetail(int bno);
    //게시판 수정
    boolean bUpdate(BoardDto boardDto);
    //게시판 삭제
    boolean bDelete(BoardDto boardDto);
    //#############################################//
    //카테고리 출력
    List<BoardDto>categoryprint();

}
