package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.service.ExpLogService;

@RestController
@RequestMapping("/exp")
public class ExpLogController {
    @Autowired private ExpLogService expLogService;


}
