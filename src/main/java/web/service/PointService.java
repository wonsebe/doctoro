package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.PointDao;
import web.model.dto.PointDto;
import web.model.dto.UserDto;

import java.util.ArrayList;

@Service
public class PointService {
    @Autowired private PointDao pointDao;
    @Autowired private UserService userService;

    // 유료 포인트 충전
    public boolean chargePaidPoint(PointDto pointIndecrease) {
        System.out.println("PointService.chargePaidPoint");
        System.out.println("paidPoint = " + pointIndecrease);

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        PointDto pointDto = PointDto.builder()
                .point_indecrease(pointIndecrease.getPoint_indecrease())
                .free_paid("유료")
                .point_reason("유료 포인트 충전")
                .uno(loginUno)
                .build();
        System.out.println("pointDto = " + pointDto);

        return pointDao.chargePaidPoint(pointDto);
    }

    // 나의 현재 무료 포인트 값 가져오기
    public PointDto currentFreePoint() {
        System.out.println("PointService.currentFreePoint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return pointDao.currentFreePoint(loginUno);
    }

    // 나의 무료 포인트 로그 가져오기
    public ArrayList<PointDto> freePointLog() {
        System.out.println("PointService.freePointLog");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return pointDao.freePointLog(loginUno);
    }

    // 나의 현재 유료 포인트 값 가져오기
    public PointDto currentPaidPoint() {
        System.out.println("PointService.currentPaidPoint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return pointDao.currentPaidPoint(loginUno);
    }

    // 나의 유료 포인트 로그 가져오기
    public ArrayList<PointDto> paidPointLog() {
        System.out.println("PointService.paidPointLog");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return pointDao.paidPointLog(loginUno);
    }


}
