console.log('order-detail.js');

let urlParams = new URL(location.href).searchParams;
let ono = parseInt(urlParams.get("ono"));

let totalPrice = 0;         // 총 결제 금액 (상품 가격 + 배달비)

// 주문 상세 내역 출력
orderDetailPrint();
function orderDetailPrint() {       console.log('orderDetailPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/order/print/detail',
        data : { order_no : ono },
        success : (result) => {     console.log(result);
            // 주문번호가 같고 상품 번호가 같으면 묶어주기
            let 전처리결과 = []
            result.forEach( item => {
                let check = false ;
                전처리결과.forEach( item2 => {
                    if( item.product_no == item2.product_no && item.order_no == item2.order_no ){
                        check = true;
                        item2['count'] = item2['count'] + 1; // 기존에 추가 
                    }
                })
                if( check == false ){
                    item['count'] = 1 ;
                    전처리결과.push( item );
                }
            })
            console.log( 전처리결과 );


            let orderDetailContent = document.querySelector('#orderDetailContent');
            let priceInfo = document.querySelector('.priceInfo');
            let html = ``;            
            let html2 = ``;

            let deliveryCheck = false;      // 배송 필요 여부 체크

            전처리결과.forEach(주문 => {
                let oStatus = '';
                
                let pFolderName = '';
                // 해당 상품의 이미지가 저장돼있는 카테고리 폴더명 구하기
                if (주문.pcategory_name == '굿즈') {
                    pFolderName = 'goods';
                } else if (주문.pcategory_name == '카드') {
                    pFolderName = 'card';
                } else if (주문.pcategory_name == '강화 아이템') {
                    pFolderName = 'item';
                }

                if (주문.order_status == 0) {   // 주문상태가 0이면 주문완료로 처리
                    oStatus = '주문완료';
                } else if (주문.order_status == 1) {   // 주문상태가 1이면 환불로 처리
                    oStatus = '환불';
                }

                html += `
                        <div class="orderHeader">
                            <div class="orderNum">
                                <h4>주문번호</h4>
                                <a href="/order/detail?ono=${주문.order_no}">${주문.order_no}</a>
                            </div>
                            <span> 주문일자 ${주문.order_date} </span>
                        </div>

                        <div class="orderCard">
                            <a href="/order/detail?ono=${주문.order_no}">
                                <img id="productImg" src="/img/${pFolderName}/${주문.product_image}" />
                            </a>
                        
                            <div class="orderProduct">
                                <div> <a href="/order/detail?ono=${주문.order_no}">${주문.product_name}</a> </div>
                
                                <div class="orderProductBottom">
                                    <div> <a href="/order/detail?ono=${주문.order_no}">${주문.price * 주문.count}원</a> </div>
                                    <div> ${주문.count}개 </div>
                                </div>
                            </div>
                            
                            <div class="orderStatus"> ${oStatus} </div>

                            <div class="deliveryStatus"> ${주문.delivery_status} </div>
                        </div>
                        `

                totalPrice += 주문.count * 주문.price;

                if (pFolderName != "item") {    // 주문 상품 중 카테고리가 아이템이 아닌 게 있다면 배송 여부 true로 변환
                    deliveryCheck = true;
                    console.log(pFolderName != "강화 아이템");
                }
            })  // forEach() end

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

            orderDetailContent.innerHTML = html;
            priceInfo.innerHTML = html2;
        }   // success end
    })  // ajax end
}   // orderDetailPrint() end

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
