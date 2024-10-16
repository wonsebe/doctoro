package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.AdminDao;
import web.model.dto.PointDto;
import web.model.dto.ProductDto;
import web.model.dto.UserDto;

import java.util.ArrayList;

@Service
public class AdminService {

    @Autowired private AdminDao adminDao;

    public ArrayList<ProductDto> getMainShop(ProductDto productDto)
    {return adminDao.getMainShop(productDto);}

    public boolean add (ProductDto productDto)
    {return adminDao.add(productDto);}

    public ArrayList<ProductDto> prtpoint(PointDto pointDto)
    {return adminDao.prtpoint(pointDto);}

    public boolean addpoint (PointDto pointDto)
    {return adminDao.addpoint(pointDto);}

    public ArrayList<UserDto> user(UserDto userDto)
    {return adminDao.user(userDto);}
}
