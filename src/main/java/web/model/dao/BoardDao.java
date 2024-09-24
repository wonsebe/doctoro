package web.model.dao;

import org.apache.ibatis.annotations.Mapper;

import org.springframework.web.bind.annotation.RequestParam;
import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;
import web.model.dto.CommentDto;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardDao {

    //#################게시판 관련#################//
    //게시판 등록
    boolean bWrite(BoardDto boardDto);
    //게시판 전체 게시물 수 반환
    int getTotalBoardSize(Map<String, Object> params);
    //게시판 출력
    List<BoardDto> bPrint(Map<String, Object> params);
    //게시판 개별출력
    BoardDto bDetail(int bno);
    //게시물 조회수 증가
    boolean bView(int bno);
    //게시판 수정
    boolean bUpdate(BoardDto boardDto);
    //게시판 삭제
    boolean bDelete(BoardDto boardDto);
    //카테고리 출력
    List<BoardDto>categoryprint();

    //게시판 단어 빈도수 출력
    List<BoardDto>boardCount(BoardDto boardDto);






}
