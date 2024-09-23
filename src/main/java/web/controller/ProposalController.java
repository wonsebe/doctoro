package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.ProposalDto;
import web.service.ProposalService;

import java.util.List;

@RestController
@RequestMapping("/pro")
public class ProposalController {

    @Autowired private ProposalService proposalService;

    @GetMapping("/get")
    public List<ProposalDto> get () {
        System.out.println("proposalService = " + proposalService);
        return proposalService.get();
    }
}
