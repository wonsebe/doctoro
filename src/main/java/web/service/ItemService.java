package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ItemDao;
import web.model.dto.ItemDto;

@Service
public class ItemService {
    @Autowired private ItemDao itemDao;

    // 카테고리명이 '강화 아이템'인 상품을 구매 시 아이템 테이블에 레코드 등록
    public boolean itemAdd(ItemDto itemDto) {
        System.out.println("ItemService.itemAdd");
        System.out.println("itemDto = " + itemDto);
        return itemDao.itemAdd(itemDto);
    }

}
