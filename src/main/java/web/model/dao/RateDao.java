package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.RateDto;

import java.util.List;
import java.util.Map;

@Mapper
public interface RateDao {

    boolean RateRecord(RateDto rateDto);

    List<RateDto> RateSend();
}
