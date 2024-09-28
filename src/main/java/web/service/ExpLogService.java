package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ExpLogDao;

@Service
public class ExpLogService {
    @Autowired private ExpLogDao expLogDao;

}
