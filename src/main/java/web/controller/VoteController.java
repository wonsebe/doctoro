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

    // 투표 기록 1등 출력
    @GetMapping("/record/read_first")
    public List<VoteCityDto> cityVoteRecordFirst(){
        System.out.println("VoteController.cityVoteRecordRead");
        return voteService.cityVoteRecordFirst();
    }

    // 투표 기록 2등 출력
    @GetMapping("/record/read_second")
    public List<VoteCityDto> cityVoteRecordSecond(){
        System.out.println("VoteController.cityVoteRecordSecond");
        return voteService.cityVoteRecordSecond();
    }

    // 투표 기록 3등 출력
    @GetMapping("/record/read_third")
    public List<VoteCityDto> cityVoteRecordThird(){
        System.out.println("VoteController.cityVoteRecordThird");
        return voteService.cityVoteRecordThird();
    }
}
