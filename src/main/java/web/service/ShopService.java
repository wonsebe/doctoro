package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ShopDao;

@Service
public class ShopService {

    @Autowired private ShopDao shopDao;

}
