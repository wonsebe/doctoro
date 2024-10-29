package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.ItemDao;
import web.model.dto.ExpLogDto;
import web.model.dto.ItemDto;
import web.model.dto.UserDto;

import java.util.ArrayList;

@Service
public class ItemService {
    @Autowired private ItemDao itemDao;
    @Autowired private UserService userService;
    @Autowired private ExpLogService expLogService;

    // 카테고리명이 '강화 아이템'인 상품을 구매 시 아이템 테이블에 레코드 등록
    public boolean itemAdd(ItemDto itemDto) {
        System.out.println("ItemService.itemAdd");
        System.out.println("itemDto = " + itemDto);
        return itemDao.itemAdd(itemDto);
    }

    // 내 아이템 목록 출력
    public ArrayList<ItemDto> itemPrint() {
        System.out.println("ItemService.itemPrint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();       // 유저 번호
        System.out.println("loginUno = " + loginUno);

        return itemDao.itemPrint(loginUno);
    }

    // 아이템 사용 클릭 시, 사용 여부 상태 변경 (0 -> 1)
    public boolean itemUse(ItemDto itemDto) {
        System.out.println("ItemService.itemUse");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        itemDto.setUno(loginDto.getUno());       // 유저 번호 추가
        System.out.println("itemDto = " + itemDto);

        // 경험치 기록 - 아이템 사용 10 경험치
        ExpLogDto expLogDto = ExpLogDto.builder()
                .expvalue(10)
                .expmethod("아이템 사용")
                .build();
        System.out.println("expLogDto = " + expLogDto);
        expLogService.pokeExpLogAdd(expLogDto, loginDto.getUno());

        return itemDao.itemUse(itemDto);
    }

}
