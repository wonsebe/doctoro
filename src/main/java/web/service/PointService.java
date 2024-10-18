package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.PointDao;
import web.model.dto.PointDto;
import web.model.dto.UserDto;

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
    public int currentFreePoint() {
        System.out.println("PointService.currentFreePoint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return 0;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        return pointDao.currentFreePoint(loginUno);
    }

}
