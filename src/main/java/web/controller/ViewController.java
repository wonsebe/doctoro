package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    // ===================== [1] 레이아웃 ===================== //
    @GetMapping("/")
    public String index() {
        return "/index.html";
    }

    // ===================== [2] 유저 관련 ===================== //
    // 1. 회원가입 페이지 요청
    @GetMapping("/user/signup")
    public String userSignupPage() {
        return "/user/signup.html";
    }

    // 2. 로그인 페이지 요청
    @GetMapping("/user/login")
    public String userLoginPage() {
        return "/user/login.html";
    }

    // 3. 내정보 페이지 요청
    @GetMapping("/user/myinfo")
    public String userMyinfoPage() {
        return "/user/myinfo.html";
    }

    // 4. 회원 정보 수정 페이지 요청
    @GetMapping("/user/update")
    public String userUpdatePage() {
        return "/user/update.html";
    }

    // 5. 회원 탈퇴 페이지 요청
    @GetMapping("/user/delete")
    public String userDeletePage() {
        return "/user/delete.html";
    }

    // 6. 아이디 찾기 페이지 요청
    @GetMapping("/user/findid")
    public String userFindIdPage() {
        return "/user/findid.html";
    }

    // 7. 비밀번호 찾기 페이지 요청
    @GetMapping("/user/findpw")
    public String userFindPwPage() {
        return "/user/findpw.html";
    }

    // 8. 비밀번호 재설정 페이지 요청
    @GetMapping("/user/reset/pw")
    public String userResetPwPage() {
        return "/user/resetpw.html";
    }

    // ===================== [3] 게시판관련 ===================== //
    //게시판 등록 페이지 요청
    @GetMapping("/board/bwrite")
    public String boardWrite(){return  "/board/write.html";}

    //게시판 전체 출력 페이지 요청
    @GetMapping("/board/bprint")
    public String boardPrint(){return  "/board/board.html";}

    //게시판 상세페이지 요청
    @GetMapping("/board/detail")
    public String boardDetail(){return  "/board/detail.html";}
    //====================== 랭킹 ===========================//
    @GetMapping("/rank/get")
    public String getRank(){return "/rank/rank.html";}

    @GetMapping("/rank/tnm")
    public String getTournamentRank(){return "/rank/tournamentRank.html";}

    // 승률 예측 페이지
    @GetMapping("/rate")
    public String rate(){
        return "/rate/rate.html";
    }

    // 포켓몬위키 페이지
    @GetMapping("/info")
    public String info(){
        return "/info/info.html";
    }

    // 포켓몬위키 개별정보 페이지
    @GetMapping("/info/detail")
    public String infoDetail(){
        return "/info/info_detail.html";
    }
}
