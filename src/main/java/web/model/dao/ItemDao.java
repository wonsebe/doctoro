package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ItemDto;

import java.util.ArrayList;

@Mapper
public interface ItemDao {

    // 카테고리명이 '강화 아이템'인 상품을 구매 시 아이템 테이블에 레코드 등록
    boolean itemAdd(ItemDto itemDto);

    // 내 아이템 목록 출력
    ArrayList<ItemDto> itemPrint(int loginUno);

    // 아이템 사용 클릭 시, 사용 여부 상태 변경 (0 -> 1)
    boolean itemUse(ItemDto itemDto);

}
