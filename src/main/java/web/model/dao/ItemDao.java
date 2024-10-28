package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.ItemDto;

@Mapper
public interface ItemDao {

    // 카테고리명이 '강화 아이템'인 상품을 구매 시 아이템 테이블에 레코드 등록
    public boolean itemAdd(ItemDto itemDto);

}
