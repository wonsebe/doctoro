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
function productNumCheck() {    console.log('productNumCheck()');
    let productNum = document.querySelector('#productNum').value;
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

            result.forEach(장바구니 => {
                html += `       
                        <div>
                            <div> <a href="/product/detail?pno=${장바구니.product_no}">${장바구니.product_image}</a> </div>
                            <div> <a href="/product/detail?pno=${장바구니.product_no}">${장바구니.product_name }</a> </div>
                            <div>${장바구니.product_description}</div>
                            <div>${장바구니.price}</div>
                            <div>${장바구니.pcategory_name}</div>

                            <label for="productNum">수량</label> </br>
                            <button type="button">-</button>
                            <input type="text" id="productNum" value="${장바구니.cart_product_quantity}"
                                onkeyup="productNumCheck()" />
                            <button type="button">+</button>

                            <div>${장바구니.cart_product_quantity * 장바구니.price}원</div>
                            <button type="button" onclick="cartUpdate(${장바구니.product_no})">수정</button>
                            <button type="button" onclick="cartDelete(${장바구니.product_no})">X</button>
                        </div>
                        `
            })

            cartArea.innerHTML = html;

        }   // success end
    })  // ajax end
}   // cartPrint() end

// 장바구니 수량 수정
function cartUpdate(pno) {     console.log('cartUpdate()');
    let productNum = document.querySelector('#productNum').value;
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

