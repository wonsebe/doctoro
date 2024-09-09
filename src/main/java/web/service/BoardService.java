package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import web.model.dao.BoardDao;
import web.model.dto.BoardDto;

import java.util.List;

@Service
public class BoardService {
    @Autowired private BoardDao boardDao;

    //#################게시판 관련#################//
    //게시판 등록
    public boolean bWrite(BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardService.bWrite");
        return boardDao.bWrite(boardDto);
    }
    //게시판 출력
    public List<BoardDto> bPrint(){
        System.out.println("boardDao = " + boardDao);
        System.out.println("BoardService.bPrint");
        return boardDao.bPrint();
    }

    //게시판 개별출력
    public BoardDto bDetail(int bno){
        System.out.println("bno = " + bno);
        System.out.println("BoardService.bDetail");
        return boardDao.bdetail(bno);}

    //게시판 수정
    public boolean bUpdate(BoardDto boardDto){
        System.out.println("boardDto = " + boardDto);
        System.out.println("BoardService.bUpdate");
        return boardDao.bUpdate(boardDto);
    }

    //게시판 삭제
    public int bDelete(int bno){
        System.out.println("bno = " + bno);
        System.out.println("BoardService.bDelete");
        return boardDao.bDelete(bno);
    }
    //################################################//
}
