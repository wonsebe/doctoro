package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.PointDto;

@Mapper
public interface PointDao {

    // 유료 포인트 충전
    public boolean chargePaidPoint(PointDto pointDto);

}
