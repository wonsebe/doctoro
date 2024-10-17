package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.VoteCityDto;
import web.service.VoteService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/vote")
public class VoteController {

    @Autowired
    VoteService voteService;

    @GetMapping("/read")
    public ArrayList<VoteCityDto> cityAllRead(){
        System.out.println("VoteController.cityAllRead");
        return voteService.cityAllRead();
    };
}
