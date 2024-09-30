package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.ExpLogDto;
import web.service.ExpLogService;

import java.util.List;

@RestController
@RequestMapping("/exp")
public class ExpLogController {
    @Autowired private ExpLogService expLogService;

    // 총 경험치 값 가져오기
    @GetMapping("/total")
    public int expTotal(@RequestParam("loginUno") int loginUno) {
        System.out.println("ExpLogController.expTotal");
        return expLogService.expTotal(loginUno);
    }

    // 내 포켓몬 경험치 기록 최근 20개 가져오기
    @GetMapping("/log")
    public List<ExpLogDto> expLogPrint() {
        System.out.println("ExpLogController.expLogPrint");
        return expLogService.expLogPrint();
    }


}
