package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.OrderDao;
import web.model.dto.*;

import java.util.ArrayList;

@Service
public class OrderService {
    @Autowired private OrderDao orderDao;
    @Autowired private UserService userService;

    @Autowired private PointService pointService;
    @Autowired private AdminService adminService;
    @Autowired private DeliveryService deliveryService;
    @Autowired private ItemService itemService;

    // 주문내역 출력
    public ArrayList<OrdersDto> orderPrint() {
        System.out.println("OrderService.orderPrint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();       // 유저 번호
        System.out.println("loginUno = " + loginUno);

        return orderDao.orderPrint(loginUno);
    }

    // 주문 등록 (상품 구매) / product_no : 상품 번호 / productNum : 상품 구매 수량 / totalPrice : 총 결제 금액 / pcategory_name : 상품 카테고리명
    public boolean orderAdd(int product_no, int productNum, int totalPrice, String pcategory_name) {
        System.out.println("OrderService.orderAdd");
        System.out.println("product_no = " + product_no);
        System.out.println("productNum = " + productNum);

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }

        // =============== 주문 부분 =============== //
        OrdersDto ordersDto = OrdersDto.builder()
                .uno(loginDto.getUno())     // 유저 번호
                .product_no(product_no)     // 상품 번호
                .build();
        orderDao.orderAdd(ordersDto);        // 주문 테이블에 레코드 등록 / 등록한 레코드의 주문번호 가져와서 ordersDto에 저장
        // ordersDto.setOrder_no(orderDao.orderAdd(ordersDto)); 를 하면 주문 번호가 제대로 들어가는 게 아닌 1이 들어감.
        // setter를 자동으로 해줘서 여기서는 위처럼 해주지 않아도 된다
        System.out.println("주문 테이블에 등록 완료");
        System.out.println("ordersDto = " + ordersDto);

        // =============== 주문 상세 부분 =============== //
        boolean oDetailResult = orderDetailAdd(ordersDto, productNum);      // 주문 상세 등록 함수 호출
        if (false == oDetailResult) {   // 주문 상세 등록 실패 시
            return false;
        }

        // =============== 포인트 부분 =============== //
        PointDto pointDto = PointDto.builder()
                .point_indecrease(totalPrice)
                .point_reason("상품 구매")
                .build();
        boolean pointResult = pointService.chargePaidPoint(pointDto);      // 총 금액만큼 포인트 차감
        if (false == pointResult) {   // 포인트 총 금액 차감 레코드 등록 실패 시
            return false;
        }

        if (!pcategory_name.equals("강화 아이템")) {      // 상품 카테고리가 아이템이 아닐 경우
            // =============== 재고 부분 =============== //
            InventoryDto inventoryDto = InventoryDto.builder()
                    .inventory_indecrease(productNum * (-1))
                    .inventory_reason("상품구매")
                    .product_no(product_no)
                    .build();
            boolean inventoryResult = adminService.prodadd(inventoryDto);     // 상품 구매한 수량만큼 재고 차감
            if (false == inventoryResult) {     // 상품 구매한 수량만큼 재고 차감 레코드 등록 실패 시
                return false;
            }

            // =============== 배송 부분 =============== //
            DeliveryDto deliveryDto = DeliveryDto.builder()
                    .delivery_status("배송 준비 중")
                    .order_no(ordersDto.getOrder_no())
                    .build();
            boolean deliveryResult = deliveryService.deliveryAdd(deliveryDto);      // 주문한 것에 대한 배송 정보 등록
            if (false == deliveryResult) {     // 배송 테이블에 레코드 등록 실패 시
                return false;
            }
        } else {        // 상품 카테고리가 아이템일 경우
            // =============== 아이템 부분 =============== //
            System.out.println("아이템 등록");

            ItemDto itemDto = ItemDto.builder()
                    .item_use(0)                 // 아이템 사용 여부
                    .uno(loginDto.getUno())     // 유저 번호
                    .product_no(product_no)               // 상품 번호
                    .build();

            // 상품 구매 수량만큼 DB에 레코드 등록
            boolean itemResult = false;
            for (int i = 0; i < productNum; i++) {
                itemResult = itemService.itemAdd(itemDto);

                if (false == itemResult) {      // 아이템 테이블에 레코드 등록 실패 시
                    break;
                }
            }
            if (false == itemResult) {     // 아이템 테이블에 레코드 등록 실패 시
                return false;
            }
        }

        return true;    // 고치기
    }

    // 주문 상세 등록 / productNum : 상품 구매 수량
    public boolean orderDetailAdd(OrdersDto ordersDto, int productNum) {
        System.out.println("OrderService.orderDetailAdd");
        System.out.println("ordersDto = " + ordersDto);
        boolean result = false;

        // 상품 구매 수량만큼 DB에 레코드 등록
        for (int i = 0; i < productNum; i++) {
            result = orderDao.orderDetailAdd(ordersDto);

            if (false == result) {
                break;
            }
        }
        return result;
    }

    // 주문 번호 기준 같은 상품 개수 구하기
    public ArrayList<OrdersDto> orderProductSum() {
        System.out.println("OrderService.orderProductSum");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();       // 유저 번호
        System.out.println("loginUno = " + loginUno);

        return orderDao.orderProductSum(loginUno);
    }

}
