package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.PointDto;

import java.util.ArrayList;

@Mapper
public interface PointDao {

    // 유료 포인트 충전
    boolean chargePaidPoint(PointDto pointDto);

    // 나의 현재 무료 포인트 값 가져오기
    PointDto currentFreePoint(int loginUno);

    // 나의 무료 포인트 로그 가져오기
    public ArrayList<PointDto> freePointLog(int loginUno);

    // 나의 현재 유료 포인트 값 가져오기
    PointDto currentPaidPoint(int loginUno);

    // 나의 유료 포인트 로그 가져오기
    public ArrayList<PointDto> paidPointLog(int loginUno);


}
