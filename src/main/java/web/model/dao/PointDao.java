package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.PointDto;

import java.util.ArrayList;

@Mapper
public interface PointDao {

    // 유료 포인트 충전 / 상품 결제 시 포인트 차감
    boolean chargePaidPoint(PointDto pointDto);

    // 나의 현재 무료 포인트 값 가져오기
    PointDto currentFreePoint(int loginUno);

    // 나의 무료 포인트 로그 가져오기
    public ArrayList<PointDto> freePointLog(int loginUno);

    // 나의 현재 유료 포인트 값 가져오기
    PointDto currentPaidPoint(int loginUno);

    // 나의 유료 포인트 로그 가져오기
    public ArrayList<PointDto> paidPointLog(int loginUno);

    //무료 포인트 충전/기록하기
    public boolean addPoint(PointDto pointDto);

    //보유 무료포인트 조회
    public int readPointLog(int uno);

    public boolean changePoint(PointDto pointDto);

    public boolean deletePoint(PointDto pointDto);
}
