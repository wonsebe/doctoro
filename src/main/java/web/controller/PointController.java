package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.service.PointService;

@RestController
@RequestMapping("/point")
public class PointController {
    @Autowired private PointService pointService;



}
