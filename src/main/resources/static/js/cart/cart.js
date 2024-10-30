console.log('cart.js');

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

// 상품 수량 입력값 체크
function productNumCheck(pno) {    console.log('productNumCheck()');
    let productNum = document.querySelector(`#productNum${pno}`).value;
    console.log(productNum);

    // 값이 정수가 아니면 1로 설정
    if (!Number.isInteger(Number(productNum))) {
        productNum = 1;

        console.log(productNum);
        document.querySelector('#productNum').value = 1;
    }
}   // productNumCheck() end

// 장바구니 출력
cartPrint();
function cartPrint() {  console.log('cartPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/cart/print',
        success : (result) => {     console.log(result);
            let cartArea = document.querySelector('#cartArea');
            let html = ``;

            let pFolderName = '';

            let 총수량 = 0
            let 총금액 = 0

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

                // html += `       
                //         <div>
                //             <div>
                //                 <a href="/product/detail?pno=${장바구니.product_no}">
                //                     <img id="productImg" src="/img/${pFolderName}/${장바구니.product_image}" />
                //                 </a>
                //             </div>
                //             <div> <a href="/product/detail?pno=${장바구니.product_no}">${장바구니.product_name}</a> </div>
                //             <div>${장바구니.product_description}</div>
                //             <div>${장바구니.price}</div>
                //             <div>${장바구니.pcategory_name}</div>

                //             <label for="productNum">수량</label> </br>
                //             <button type="button" onclick="proNumChange('-', ${장바구니.product_no})">-</button>
                //             <input type="text" id="productNum${장바구니.product_no}" value="${장바구니.cart_product_quantity}"
                //                 onkeyup="productNumCheck(${장바구니.product_no})" />
                //             <button type="button" onclick="proNumChange('+', ${장바구니.product_no})">+</button>

                //             <div>${장바구니.cart_product_quantity * 장바구니.price}원</div>
                //             <button type="button" onclick="cartUpdate(${장바구니.product_no})">수정</button>
                //             <button type="button" onclick="cartDelete(${장바구니.product_no})">X</button>
                //         </div>`
                총수량+= 장바구니.cart_product_quantity
                총금액+= (장바구니.cart_product_quantity * 장바구니.price)
                html +=
                                    `
                                    <tr>
                                        <td>
                                            <a href="/product/detail?pno=${장바구니.product_no}">
                                                <img id="productImg" src="/img/${pFolderName}/${장바구니.product_image}" style="width: 100px; height: auto;">
                                            </a>
                                        </td>
                                        <td><a href="/product/detail?pno=${장바구니.product_no}">${장바구니.product_name}</a> </td>
                                        <td >${장바구니.price.toLocaleString()}원</td>
                                        <td>${장바구니.pcategory_name}</td>
                                        <td>
                                            <button type="button" onclick="proNumChange('-', ${장바구니.product_no})">-</button>
                                            <input type="text" id="productNum${장바구니.product_no}" value="${장바구니.cart_product_quantity}"onkeyup="productNumCheck(${장바구니.product_no})" />
                                            <button type="button" onclick="proNumChange('+', ${장바구니.product_no})">+</button>
                                        </td>
                                        <td class="cart_price_td">${(장바구니.cart_product_quantity * 장바구니.price).toLocaleString()}원</td>
                                        <td><button type="button" onclick="cartDelete(${장바구니.product_no})">X</button></td>
                                    </tr>
                        `
            })

            cartArea.innerHTML = html;
             document.querySelector('.cart_total_count').innerHTML = 총수량 + '개'
              document.querySelector('.cart_total_price').innerHTML = 총금액.toLocaleString() + '원'

        }   // success end
    })  // ajax end
}   // cartPrint() end

// 장바구니 수량 수정
function cartUpdate(pno) {     console.log('cartUpdate()');
    let productNum = document.querySelector(`#productNum${pno}`).value;
    $.ajax({
        async : false,
        method : 'put',
        url : '/cart/update',
        data : {
            cart_product_quantity : productNum,
            product_no : pno
        },
        success : (result) => {     console.log(result);
            if (result) {
                alert('수정되었습니다.');
                cartPrint();
            } else {
                alert('다시 시도해주십시오.');
            }
        }   // success end
    })  // ajax end
}   // cartUpdate() end

// 장바구니 항목 삭제
function cartDelete(pno) {     console.log('cartDelete()');
    $.ajax({
        async : false,
        method : 'delete',
        url : '/cart/delete',
        data : { product_no : pno },
        success : (result) => {     console.log(result);
            if (result) {
                alert('삭제되었습니다.');
                cartPrint();
            } else {
                alert('다시 시도해주십시오.');
            }
        }   // success end
    })  // ajax end
}   // cartDelete() end

// 상품 수량 변경
function proNumChange(mode, pno) {   console.log('proNumChange()');
    console.log(mode);
    console.log(pno);
    
    let productNum = document.querySelector(`#productNum${pno}`);
    let productNumValue = productNum.value;
    let pNum = 0;

    console.log(Number(productNumValue));
    if (mode == '+') {
        pNum = Number(productNumValue) + 1;
        productNum.value = pNum;

    } else if (mode == '-' && Number(productNumValue) > 1) {
        pNum = Number(productNumValue) - 1;
        productNum.value = pNum;
    }
    cartUpdate( pno ) // 제품 수정

}   // proNumChange() end

// 결제 창으로 이동
function purchase() {   console.log('purchase()');
    location.href='/purchase';      // 구매 페이지로 이동
}   // purchase() end
