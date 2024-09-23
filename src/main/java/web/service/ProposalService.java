package web.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ProposalDao;
import web.model.dto.ProposalDto;

import java.util.List;

@Service
public class ProposalService {

    @Autowired private ProposalDao proposalDao;

    public List<ProposalDto> get (){
        System.out.println("proposalDao = " + proposalDao);
        return proposalDao.get();
    }
}
