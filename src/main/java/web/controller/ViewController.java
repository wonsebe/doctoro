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



}
