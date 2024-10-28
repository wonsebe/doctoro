package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.ItemDto;
import web.model.dto.OrdersDto;
import web.service.ItemService;

import java.util.ArrayList;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired private ItemService itemService;

    // 내 아이템 목록 출력
    @GetMapping("/print")
    public ArrayList<ItemDto> itemPrint() {
        System.out.println("ItemController.itemPrint");
        return itemService.itemPrint();
    }

    // 아이템 사용 클릭 시, 사용 여부 상태 변경 (0 -> 1)
    @PutMapping("/use")
    public boolean itemUse(ItemDto itemDto) {
        System.out.println("ItemController.itemUse");
        return itemService.itemUse(itemDto);
    }

}
