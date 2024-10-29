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

    @Autowired private CartService cartService;

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

        return true;
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

    // =============== 장바구니 =============== //
    // 주문 등록 (상품 구매) - 장바구니
    public boolean orderCartAdd() {
        System.out.println("OrderService.orderCartAdd");
        int totalPrice = 0;     // 총 결제 금액
        boolean deliveryCheck = false;      // 배송 필요 여부 체크

        // * 1. 주문한 ( 로그인된 ) 회원의 [번호]
        // [번호]
        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return false;
        }
        int loginUno = loginDto.getUno();       // 유저 번호
        System.out.println("loginUno = " + loginUno);


        // * 2. 장바구니에 담은(주문 예정인) ( 제품 번호 와 수량 와 가격 ) 모두 ( 리스트 )가져오기
        // list[ 제품 번호 , 수량 , 가격 , 카테고리 ]
        ArrayList<ProductDto> cartList = cartService.cartPrint();       // 장바구니 목록 가져오기
        System.out.println("cartList = " + cartList);
        if (cartList == null) {     // 만약 장바구니가 비어있다면
            return false;
        }
        System.out.println(cartList.get(0));


        // * 3. 리스트(주문목록)를 주문 등록 --> 주문 번호 반환  ( 1개)
        // 주문번호
        OrdersDto ordersDto = OrdersDto.builder()
                .uno(loginUno)          // 유저 번호
                .build();
        orderDao.orderAdd(ordersDto);        // 주문 테이블에 레코드 등록 / 등록한 레코드의 주문번호 가져와서 ordersDto에 저장
        System.out.println("ordersDto = " + ordersDto);


        // * 4. 리스트(주문목록)를 주문 상세 등록 --> 개별 등록 ( for ) ( n개 )
        boolean oDetailResult = false;
        for (int i = 0; i < cartList.size(); i++) {
            totalPrice += cartList.get(i).getPrice() * cartList.get(i).getCart_product_quantity();       // 총 결제 금액 구하기. 상품 가격 * 구매 수량

            ordersDto.setProduct_no(cartList.get(i).getProduct_no());       // 상품번호 추가
            oDetailResult = orderDetailAdd(ordersDto, cartList.get(i).getCart_product_quantity());      // 주문 상세 등록 함수 호출

            if (false == oDetailResult) {      // 주문 상세 테이블에 레코드 등록 실패 시
                return false;
            }

            if (!cartList.get(i).getPcategory_name().equals("강화 아이템")) {    // 주문 상품 중 카테고리가 아이템이 아닌 게 있다면 배송 여부 true로 변환
                deliveryCheck = true;
            }

            // 상품 카테고리가 아이템인지 판별 후 처리
            if (!cartList.get(i).getPcategory_name().equals("강화 아이템")) {      // 상품 카테고리가 아이템이 아닐 경우
                // 6. 리스트(주문목록)를 재고 차감 --> 개별 차감
                InventoryDto inventoryDto = InventoryDto.builder()
                        .inventory_indecrease(cartList.get(i).getCart_product_quantity() * (-1))
                        .inventory_reason("상품구매")
                        .product_no(cartList.get(i).getProduct_no())
                        .build();
                boolean inventoryResult = adminService.prodadd(inventoryDto);     // 상품 구매한 수량만큼 재고 차감
                if (false == inventoryResult) {     // 상품 구매한 수량만큼 재고 차감 레코드 등록 실패 시
                    return false;
                }
            } else {        // 상품 카테고리가 아이템일 경우
                // 8. 만약에 굿즈가 아닌 '아이템' 이면 내 아이템에 등록 --> 개별
                System.out.println("아이템 등록");

                ItemDto itemDto = ItemDto.builder()
                        .item_use(0)                                        // 아이템 사용 여부
                        .uno(loginDto.getUno())                             // 유저 번호
                        .product_no(cartList.get(i).getProduct_no())        // 상품 번호
                        .build();

                // 상품 구매 수량만큼 DB에 레코드 등록
                boolean itemResult = false;
                for (int j = 0; j < cartList.get(i).getCart_product_quantity(); j++) {
                    itemResult = itemService.itemAdd(itemDto);

                    if (false == itemResult) {      // 아이템 테이블에 레코드 등록 실패 시
                        return false;
                    }
                }
            }
        }
        
        // * 5. 포인트 등록 --> (1개)
        if (deliveryCheck) {    // 배송 여부가 true면 총 금액에 배송비 3,000원 포함
            totalPrice += 3000;
        }
        PointDto pointDto = PointDto.builder()
                .point_indecrease(totalPrice * (-1))
                .point_reason("상품 구매")
                .build();
        boolean pointResult = pointService.chargePaidPoint(pointDto);      // 총 금액만큼 포인트 차감
        if (false == pointResult) {   // 포인트 총 금액 차감 레코드 등록 실패 시
            return false;
        }

        // 7. 주문 번호 --> 배송 등록 ( 1개 )
        if (deliveryCheck) {      // 배송 여부가 true인 경우
            DeliveryDto deliveryDto = DeliveryDto.builder()
                    .delivery_status("배송 준비 중")
                    .order_no(ordersDto.getOrder_no())
                    .build();
            boolean deliveryResult = deliveryService.deliveryAdd(deliveryDto);      // 주문한 것에 대한 배송 정보 등록
            if (false == deliveryResult) {     // 배송 테이블에 레코드 등록 실패 시
                return false;
            }
        }

        // 9. 전체 성공시 현재 회원의 장바구니 모두 레코드 삭제
        boolean cartResult = cartService.cartAllDelete(loginUno);
        if (!cartResult) {
            return false;
        }

        return true;
    }

    // 주문 상세 내역 출력
    public ArrayList<OrdersDto> orderDetailPrint(OrdersDto ordersDto) {
        System.out.println("OrderService.orderDetailPrint");

        UserDto loginDto = userService.userLoginCheck();    // 로그인된 세션 정보 요청
        if (loginDto == null) {     // 비로그인이라면 리턴
            return null;
        }
        int loginUno = loginDto.getUno();       // 유저 번호
        System.out.println("loginUno = " + loginUno);
        ordersDto.setUno(loginUno);
        System.out.println("loginUno = " + loginUno);

        return orderDao.orderDetailPrint(ordersDto);
    }

}
