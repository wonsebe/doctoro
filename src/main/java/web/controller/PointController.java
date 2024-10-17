package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.service.PointService;

@RestController
@RequestMapping("/point")
public class PointController {
    @Autowired private PointService pointService;

    // 유료 포인트 충전
    @PostMapping("/charge")
    public boolean chargePaidPoint(int paidPoint) {
        System.out.println("PointController.chargePaidPoint");
        System.out.println("paidPoint = " + paidPoint);
        return pointService.chargePaidPoint(paidPoint);
    }


}
