package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.PointDto;

@Mapper
public interface PointDao {

    // 유료 포인트 충전
    boolean chargePaidPoint(PointDto pointDto);

    // 나의 현재 무료 포인트 값 가져오기
    int currentFreePoint(int loginUno);

}
