package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import web.model.dao.CommentplyDao;
import web.model.dto.CommentDto;
import web.model.dto.ExpLogDto;
import web.model.dto.UserDto;

import java.util.List;

@Service
public class CommetnplyService {
    @Autowired private CommentplyDao commentplyDao;
    @Autowired private UserService userService;
    @Autowired private ExpLogService expLogService;

    //대댓글 처리 기능 rest

    //################댓글관련########################//

    //댓글 쓰기 처리
    public boolean coment(CommentDto commentDto) {

        //1. 로그인 세션에서 값 호출
        Object object = userService.userLoginCheck();
        if (object == null) return false; //비로그인시 함수 강제종료/취소
        //2. 세션 내 회원번호 속성 호출
        UserDto memberDto = (UserDto) object;
        //3. 속성 호출
        int loginNo = memberDto.getUno();
        // 4. CommentDto 에 담아주기
        commentDto.setUno(loginNo);
        System.out.println("BoardService.coment");
        System.out.println("commentDto = " + commentDto);

        // 5. boardDao에 저장
        boolean result = commentplyDao.coment(commentDto);

        if (result) {   // 댓글 등록 성공 시
            // 경험치 기록 - 댓글 작성 5 경험치
            ExpLogDto expLogDto = ExpLogDto.builder()
                    .expvalue(5)
                    .expmethod("댓글 작성")
                    .build();
            System.out.println("expLogDto = " + expLogDto);
            expLogService.pokeExpLogAdd(expLogDto, loginNo);
        }

        return result;
    }

    //댓글 출력
    public List<CommentDto> cPrint(int bno){
        System.out.println("CommetnplyService.cPrint");


        return commentplyDao.cPrint(bno);
    }

}