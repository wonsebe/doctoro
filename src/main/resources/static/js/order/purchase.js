console.log('purchase.js');

let urlParams = new URL(location.href).searchParams;
let pno = parseInt(urlParams.get("pno"));
let pnum = parseInt(urlParams.get("pnum"));     // 상품 구매 수량

console.log(pno);
console.log(pnum);

// 상품 & 결제 금액 정보 보여주기
productPricePrint();
function productPricePrint() {   console.log('productPricePrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/product/detail/print',
        data : { productNo : pno },
        success : (result) => {     console.log(result);
            let productInfo = document.querySelector('.productInfo');
            let priceInfo = document.querySelector('.priceInfo');
            let html =``;
            let html2 =``;

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
                    <div>${result.price}</div>
                    `

            // 결제 금액 정보
            html2 += `
                    <h5>결제 금액 정보</h5>
                    <h6>상품 가격 : ${result.price}</h6>
                    <h6>배송비 : +3000원</h6>
                    <hr>
                    <h6>총 주문 금액 : ${result.price + 3000}원</h6>
                    `

            productInfo.innerHTML = html;
            priceInfo.innerHTML = html2;
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
            }

            pointInfo.innerHTML = html;
        }   // success end
    })  // ajax end
}   // currentPaidPoint() end

// 주문 테이블에 등록하기
function orderAdd() {       console.log('orderAdd()');
    $.ajax({
        async: false,
        method: 'post',
        url: '/order/add',
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



