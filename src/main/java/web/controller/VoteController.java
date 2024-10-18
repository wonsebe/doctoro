package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    // 마을 테이블 전체 출력
    @GetMapping("/read")
    public ArrayList<VoteCityDto> cityAllRead(){
        return voteService.cityAllRead();
    };


    // 투표 기록 insert
    @PostMapping("/record")
    public boolean cityVoteRecord(VoteCityDto voteCityDto){
        System.out.println("VoteController.cityVoteRecord");
        return voteService.cityVoteRecord(voteCityDto);
    }

}
