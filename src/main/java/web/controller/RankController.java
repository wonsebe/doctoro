package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.RankDto;
import web.service.RankService;

import java.util.List;


@RestController
@RequestMapping("/rank")
public class RankController {

    @Autowired private RankService rankService;

    //c
//    @PostMapping("/tournament")
//    public Object tournament( @RequestBody List<Integer> pnoList ) {
//        return RankService.tournament();
//    }

    //r
    @GetMapping("/total")
    public RankDto total( int pno ){
        return rankService.total( pno );
    }

    @PutMapping("/click")
    public boolean click (int pno ) {return rankService.click( pno ); }

    @PutMapping("/win")
    public boolean win (int pno ) {return rankService.win( pno ); }

    //u

    //d


}
