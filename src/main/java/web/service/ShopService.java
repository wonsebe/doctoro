package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ShopDao;
import web.model.dto.ShopDto;

import java.util.ArrayList;

@Service
public class ShopService {

    @Autowired private ShopDao shopDao;

    public ArrayList<ShopDto> getMainShop(ShopDto shopDto) {
        return shopDao.getMainShop(shopDto);
    }

}
