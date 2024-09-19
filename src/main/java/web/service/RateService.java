package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.RateDao;
import web.model.dto.RateDto;

import java.util.List;
import java.util.Map;

@Service
public class RateService {
    @Autowired
    RateDao rateDao;

    public boolean RateRecord(RateDto rateDto){
        return rateDao.RateRecord(rateDto);
    }

    public List<RateDto>  RateSend(){
        return rateDao.RateSend();
    }

}
