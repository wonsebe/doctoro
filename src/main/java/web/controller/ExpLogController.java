package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.ExpLogDto;
import web.service.ExpLogService;

import java.util.List;

@RestController
@RequestMapping("/exp")
public class ExpLogController {
    @Autowired private ExpLogService expLogService;

    // 포켓몬 경험치 기록하기
    @PostMapping("/add")
    public boolean pokeExpLogAdd(ExpLogDto expLogDto, int loginUno) {
        System.out.println("ExpLogController.pokeExpLogAdd");
        return expLogService.pokeExpLogAdd(expLogDto, loginUno);
    }

    // 총 경험치 값 가져오기
    @GetMapping("/total")
    public int expTotal(@RequestParam("loginUno") int loginUno) {
        System.out.println("ExpLogController.expTotal");
        return expLogService.expTotal(loginUno);
    }

    // 내 포켓몬 경험치 기록 최근 10개 가져오기
    @GetMapping("/log")
    public List<ExpLogDto> expLogPrint(int loginUno) {
        System.out.println("ExpLogController.expLogPrint");
        return expLogService.expLogPrint(loginUno);
    }


}
