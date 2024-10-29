console.log('purchase.js');

let urlParams = new URL(location.href).searchParams;
let pno = parseInt(urlParams.get("pno"));
let pnum = parseInt(urlParams.get("pnum"));     // 상품 구매 수량

let totalPrice = 0;         // 총 결제 금액 (상품 가격 + 배달비)
let pCategoryName = '';     // 상품 카테고리명
let totalPoint = 0;         // 총 유료 포인트 값

console.log(pno);
console.log(pnum);

if (isNaN(pno) && isNaN(pnum)) {    // 장바구니 페이지에서 구매 버튼을 누른 경우
    cartOrderPrint();
} else {    // 상품 페이지에서 구매 버튼을 누른 경우
    productPricePrint();
}

// 상품 & 결제 금액 정보 보여주기 - 상품 종류 1개
function productPricePrint() {   console.log('productPricePrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/product/detail/print',
        data : { productNo : pno },
        success : (result) => {     console.log(result);
            let productInfo = document.querySelector('.productInfo');
            let priceInfo = document.querySelector('.priceInfo');
            let orderButton = document.querySelector('.orderButton');
            let html =``;
            let html2 =``;
            let html3 = ``;

            pCategoryName = result.pcategory_name;      // 상품 카테고리명
            price = result.price * pnum;                // 상품 기본 가격 (배송비 금액은 밑에서 추가)

            let pFolderName = '';
            // 해당 상품의 이미지가 저장돼있는 카테고리 폴더명 구하기
            if (result.pcategory_name == '굿즈') {
                pFolderName = 'goods';
            } else if (result.pcategory_name == '카드') {
                pFolderName = 'card';
            } else if (result.pcategory_name == '강화 아이템') {
                pFolderName = 'item';
            }

            // 상품 정보
            html += `
                    <h5>주문 상품 정보</h5>
                    <img id="productImg" src="/img/${pFolderName}/${result.product_image}" />
                    <div class="productName">${result.product_name}</div>
                    <div>${pnum}개</div>
                    <div>${price}원</div>
                    `

            // 결제 금액 정보
            html2 += `
                    <h5>결제 금액 정보</h5>
                    <h6>상품 가격 : ${price}원</h6>
                    `

            if (pCategoryName != '강화 아이템') {   // 카테고리명이 강화 아이템이 아닌 경우
                html2 += `
                        <h6>배송비 : 3000원</h6>
                        <hr>
                        <h6>총 주문 금액 : ${price + 3000}원</h6>
                        `
                totalPrice = price + 3000;        // 총 결제 금액 (상품 가격 * 구매 수량 + 배달비)
            } else {    // 카테고리명이 강화 아이템인 경우
                html2 += `
                        <hr>
                        <h6>총 주문 금액 : ${price}원</h6>
                        `
                totalPrice = price;               // 총 결제 금액 (상품 가격 * 구매 수량)
            }

            // 결제 버튼 - 상품 종류 1개
            html3 += `
                    <button type="button" onclick="orderAdd()">결제하기</button>
                    `

            productInfo.innerHTML = html;
            priceInfo.innerHTML = html2;
            orderButton.innerHTML = html3;
        }   // success end
    })  // ajax end
}   // productPricePrint() end

// 회원 정보 & 배송 정보 보여주기
userDeliveryPrint();
function userDeliveryPrint() {   console.log('userDeliveryPrint()');
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/my/info',
        success: (result) => {      console.log(result);
            if (result == '') {
                alert("로그인 후 이용 가능합니다.");
                location.href = "/user/login";
            } else {
                let userInfo = document.querySelector('.userInfo');
                let deliveryInfo = document.querySelector('.deliveryInfo');
                let html =``;
                let html2 =``;

                // 주문자 정보
                html += `
                        <h5>주문자 정보</h5>
                        <div>${result.name}</div>
                        <div>${result.phone}</div>
                        `;

                // 배송 정보
                html2 += `
                        <h5>배송 정보</h5>
                        <div>${result.name}</div>
                        <div>${result.phone}</div>
                        <div>${result.address}</div>
                        `;

                userInfo.innerHTML = html;
                deliveryInfo.innerHTML = html2;
            }
        }   // success end
    })  // ajax end
}   // userDeliveryPrint() end

// 나의 현재 유료 포인트 값 가져오기
currentPaidPoint();
function currentPaidPoint() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/point/paid',
        success: (result) => {
            console.log(result.totalPoint);
            let pointInfo = document.querySelector('.pointInfo');
            let html = ``;

            if (result == '') {     // 포인트가 존재하지 않으면
                html += `
                        <h5>현재 포인트</h5>
                        <h6>0 포인트</h6>
                        `;
            } else {
                html += `
                        <h5>현재 포인트</h5>
                        <h6>${result.totalPoint} 포인트</h6>
                        `;
                totalPoint = result.totalPoint;
            }

            pointInfo.innerHTML = html;
        }   // success end
    })  // ajax end
}   // currentPaidPoint() end

// 주문 테이블에 등록하기 - 상품 종류 1개
function orderAdd() {       console.log('orderAdd()');
    if (totalPoint < totalPrice) {  // 보유 유료 포인트가 결제 금액 보다 적다면
        if (confirm("보유 유료 보인트가 결제 금액보다 적습니다.\n포인트를 충전하시겠습니까?")) {
            location.href="/point/charge";      // 확인 클릭 시, 포인트 충전 페이지로 이동
        }
        return;
    }

    $.ajax({
        async: false,
        method: 'post',
        url: '/order/add',
        data : { 
            product_no : pno,
            productNum : pnum,
            totalPrice : totalPrice * (-1),
            pcategory_name : pCategoryName
        },
        success: (result) => {      console.log(result);
            if (result) {
                alert('주문이 완료되었습니다.');
                location.href = "/order"
            } else {
                alert('다시 시도해 주십시오.');
            }
        }   // success end
    })  // ajax end
}   // orderAdd() end



// =============== 장바구니에서 구매 =============== //

// 상품 & 결제 금액 정보 보여주기 - 장바구니
function cartOrderPrint() {     console.log('cartOrderPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/cart/print',
        success : (result) => {     console.log(result);
            let productInfo = document.querySelector('.productInfo');
            let priceInfo = document.querySelector('.priceInfo');
            let orderButton = document.querySelector('.orderButton');
            let html1 = `<h5>주문 상품 정보</h5>`;
            let html2 = ``;
            let html3 = ``;

            let deliveryCheck = false;      // 배송 필요 여부 체크

            let pFolderName = '';

            // 상품 정보
            result.forEach(장바구니 => {
                // 해당 상품의 이미지가 저장돼있는 카테고리 폴더명 구하기
                if (장바구니.pcategory_name == '굿즈') {
                    pFolderName = 'goods';
                } else if (장바구니.pcategory_name == '카드') {
                    pFolderName = 'card';
                } else if (장바구니.pcategory_name == '강화 아이템') {
                    pFolderName = 'item';
                }
                console.log(pFolderName);

                html1 += `       
                        <div>
                            <img id="productImg" src="/img/${pFolderName}/${장바구니.product_image}" />
                            <div>${장바구니.product_name}</div>
                            <div>${장바구니.cart_product_quantity}개</div>
                            <div>${장바구니.cart_product_quantity * 장바구니.price}원</div>
                        </div>
                        `
                
                totalPrice += 장바구니.cart_product_quantity * 장바구니.price;

                if (pFolderName != "item") {    // 주문 상품 중 카테고리가 아이템이 아닌 게 있다면 배송 여부 true로 변환
                    deliveryCheck = true;
                    console.log(pFolderName != "강화 아이템");
                }
            })

            // 결제 금액 정보
            html2 += `
                    <h5>결제 금액 정보</h5>
                    <h6>상품 가격 : ${totalPrice}원</h6>
                    `

            if (deliveryCheck) {   // 배송 여부가 true인 경우(카테고리명이 강화 아이템이 아닌 경우)
                html2 += `
                        <h6>배송비 : 3000원</h6>
                        <hr>
                        <h6>총 주문 금액 : ${totalPrice + 3000}원</h6>
                        `
                totalPrice = totalPrice + 3000;        // 총 결제 금액
            } else {    // 카테고리명이 강화 아이템인 경우
                html2 += `
                        <hr>
                        <h6>총 주문 금액 : ${totalPrice}원</h6>
                        `
            }

            // 결제 버튼 - 장바구니
            html3 += `
                    <button type="button" onclick="orderCartAdd()">결제하기</button>
                    `

            productInfo.innerHTML = html1;
            priceInfo.innerHTML = html2;
            orderButton.innerHTML = html3;
        }   // success end
    })  // ajax end
}   // cartOrderPrint() end

// 주문 테이블에 등록하기 - 장바구니
function orderCartAdd() {   console.log('orderCartAdd()');
    if (totalPoint < totalPrice) {  // 보유 유료 포인트가 결제 금액 보다 적다면
        if (confirm("보유 유료 보인트가 결제 금액보다 적습니다.\n포인트를 충전하시겠습니까?")) {
            location.href="/point/charge";      // 확인 클릭 시, 포인트 충전 페이지로 이동
        }
        return;
    }
    
    $.ajax({
        async : false,
        method : 'post',
        url : '/order/add/cart',
        success : (result) => {     console.log(result);
            if (result) {
                alert('주문이 완료되었습니다.');
                location.href = "/order"
            } else {
                alert('다시 시도해 주십시오.');
            }
        }   // success end
    })  // ajax end
}   // orderCartAdd() end