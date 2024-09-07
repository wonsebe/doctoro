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
        return boardDao.bWrite(boardDto);
    }
    //게시판 출력
    public List<BoardDto> bPrinte(){
        return boardDao.bPrinte();
    }

    //게시판 개별출력
    public List<BoardDto>bDetail(){return boardDao.bdetail();}

    //게시판 수정
    public boolean bUpdate(BoardDto boardDto){
        return boardDao.bUpdate(boardDto);
    }

    //게시판 삭제
    public boolean bDelete(BoardDto boardDto){
        return boardDao.bDelete(boardDto);
    }
}
