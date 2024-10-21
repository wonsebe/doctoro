package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.PointDto;
import web.service.PointService;

import java.util.ArrayList;

@RestController
@RequestMapping("/point")
public class PointController {
    @Autowired private PointService pointService;

    // 유료 포인트 충전
    @PostMapping("/charge")
    public boolean chargePaidPoint(PointDto pointIndecrease) {
        System.out.println("PointController.chargePaidPoint");
        System.out.println("paidPoint = " + pointIndecrease);
        return pointService.chargePaidPoint(pointIndecrease);
    }

    // 나의 현재 무료 포인트 값 가져오기
    @GetMapping("/free")
    public PointDto currentFreePoint() {
        System.out.println("PointController.currentFreePoint");
        return pointService.currentFreePoint();
    }

    // 나의 무료 포인트 로그 가져오기
    @GetMapping("/free/log")
    public ArrayList<PointDto> freePointLog() {
        System.out.println("PointController.freePointLog");
        return pointService.freePointLog();
    }

    // 나의 현재 유료 포인트 값 가져오기
    @GetMapping("/paid")
    public PointDto currentPaidPoint() {
        System.out.println("PointController.currentPaidPoint");
        return pointService.currentPaidPoint();
    }

    // 나의 유료 포인트 로그 가져오기
    @GetMapping("/paid/log")
    public ArrayList<PointDto> paidPointLog() {
        System.out.println("PointController.paidPointLog");
        return pointService.paidPointLog();
    }


}
