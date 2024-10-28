package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.service.ItemService;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired private ItemService itemService;

}
