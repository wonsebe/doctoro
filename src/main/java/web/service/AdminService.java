package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.AdminDao;
import web.model.dto.ShopDto;

import java.util.ArrayList;

@Service
public class AdminService {

    @Autowired private AdminDao adminDao;

    public ArrayList<ShopDto> getMainShop(ShopDto shopDto) {
        return adminDao.getMainShop(shopDto);
    }

}
