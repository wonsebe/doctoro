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


            let orderContent = document.querySelector('#orderContent');
            let html = ``;

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
                        <div>
                            <div>
                                <h4>주문번호</h4>
                                <a href="/order/detail?ono=${주문.order_no}">${주문.order_no}</a>
                            </div>
                            <div> 주문일자 ${주문.order_date} </div>
                            <a href="/order/detail?ono=${주문.order_no}">
                                <img id="productImg" src="/img/${pFolderName}/${주문.product_image}" />
                            </a>                            
                            
                            <div> <a href="/order/detail?ono=${주문.order_no}">${주문.product_name}</a> </div>
                            <div> <a href="/order/detail?ono=${주문.order_no}">${주문.price}원</a> </div>

                            <div> ${주문.count}개 </div>
                            <div> ${oStatus} </div>
                        </div>
                        `
            })

            orderContent.innerHTML = html;
        }   // success end
    })  // ajax end
}   // orderPrint() end


