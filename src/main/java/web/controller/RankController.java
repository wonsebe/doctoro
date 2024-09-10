package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.RankDto;
import web.service.RankService;

import java.util.List;


@RestController
@RequestMapping("/rank")
public class RankController {

    @Autowired private RankService rankService;

    //c

    //r
    @GetMapping("/total")
    public List<RankDto> total(){
        return rankService.total();
    }

    //u

    //d


}
