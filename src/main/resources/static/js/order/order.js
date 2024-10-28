console.log('order.js');

// 로그인 체크
doLoginCheck();
function doLoginCheck() {   console.log('doLoginCheck');
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result);
            if (result == '') {                 // 비로그인 상태인 경우
                alert("로그인 후 이용 가능합니다.");
                location.href="/user/login";    // 로그인 페이지로 이동
            }
        }   // success end
    })  // ajax end
}   // doLoginCheck() end

// 주문내역 출력
orderPrint();
function orderPrint() {     console.log('orderPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/order/print',
        success : (result) => {     console.log(result);
            let orderContent = document.querySelector('#orderContent');
            let html = ``;

            result.forEach(주문 => {
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
                        <div>
                            <div>
                                <h4>주문번호</h4>
                                <a href="/order/detail?ono=${주문.order_no}">${주문.order_no}</a>
                            </div>
                            <div> 주문일자 ${주문.order_date} </div>
                            <img id="productImg" src="/img/${pFolderName}/${주문.product_image}" />
                            
                            <div> <a href="/order/detail?ono=${주문.order_no}">${주문.product_name}</a> </div>
                            <div> <a href="/order/detail?ono=${주문.order_no}">${주문.price}</a> </div>
                            <div> ${oStatus} </div>
                        </div>
                        `
            })

            orderContent.innerHTML = html;
        }   // success end
    })  // ajax end
}   // orderPrint() end


