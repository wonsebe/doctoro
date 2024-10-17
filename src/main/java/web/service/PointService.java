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
    public boolean chargePaidPoint(int paidPoint) {
        System.out.println("PointService.chargePaidPoint");
        System.out.println("paidPoint = " + paidPoint);

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        int loginUno = loginDto.getUno();
        System.out.println("loginUno = " + loginUno);

        PointDto pointDto = PointDto.builder()
                .point_indecrease(paidPoint)
                .free_paid("유료")
                .point_reason("유료 포인트 충전")
                .uno(loginUno)
                .build();
        System.out.println("pointDto = " + pointDto);

        return pointDao.chargePaidPoint(pointDto);
    }

}
