package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.RateDto;
import web.service.RateService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rate")
public class RateController {

    @Autowired
    RateService rateService;

    @PostMapping("/record")
    public boolean RateRecord(RateDto rateDto){
        return rateService.RateRecord(rateDto);
    }

    @GetMapping("/send")
    public List<RateDto> RateSend( ){
        return rateService.RateSend();
    }
}
