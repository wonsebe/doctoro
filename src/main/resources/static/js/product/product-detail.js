console.log('product-detail.js');

let urlParams = new URL(location.href).searchParams;
let pno = parseInt(urlParams.get("pno"));

// 로그인 체크
// doLoginCheck();
// function doLoginCheck() {   console.log('doLoginCheck');
//     $.ajax({
//         async : false,
//         method : 'get',
//         url : '/user/login/check',
//         success : (result) => {     console.log(result);
//             if (result != '') {          // 로그인 상태인 경우 장바구니 기능이 보이도록 하기
//                 let productCart = document.querySelector('#productCart');
//                 let html = ``;

//                 html += `

//                         `
//                 productCart.innerHTML = html;
//             }
//         }   // success end
//     })  // ajax end
// }   // doLoginCheck() end

// 상품 개별 조회 처리
productDetaillPrint();
function productDetaillPrint() {    console.log('productDetaillPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/product/detail/print',
        data : { productNo : pno },
        success : (result) => {     console.log(result);
            let productDetail = document.querySelector('#productDetail');
            let html = ``;

            let pFolderName = '';
            // 해당 상품의 이미지가 저장돼있는 카테고리 폴더명 구하기
            if (result.pcategory_name == '굿즈') {
                pFolderName = 'goods';
            } else if (result.pcategory_name == '카드') {
                pFolderName = 'card';
            } else if (result.pcategory_name == '강화 아이템') {
                pFolderName = 'item';
            }

            html += `
                    <div>
                        <img id="productImg" src="/img/${pFolderName}/${result.product_image}" />
                        <div class="productName">${result.product_name}</div>
                        <div>${result.product_description}</div>
                        <div>${result.price}</div>
                        <div>${result.pcategory_name}</div>

                        <label for="productNum">수량</label> </br>
                        <button type="button">-</button>
                        <input type="text" id="productNum" value=1 onkeyup="productNumCheck()" />
                        <button type="button">+</button>
                        <button type="button" onclick="cartAdd()">장바구니 등록</button>
                    </div>
                    `

            productDetail.innerHTML = html;

        }   // success end
    })  // ajax end
}   // productDetaillPrint() end

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

// 장바구니 등록
function cartAdd() {    console.log('cartAdd()');
    let productNum = document.querySelector('#productNum').value;
    console.log(productNum);

    $.ajax({
        async : false,
        method : 'post',
        url : '/cart/add',
        data : {
                    cart_product_quantity : productNum,
                    product_no : pno
                },
        success : (result) => {     console.log(result);
            if (result) {
                alert('장바구니에 등록되었습니다.');

                document.querySelector('#productNum').value = '';
            } else {
                alert('장바구니 등록에 실패하였습니다. 다시 시도해주십시오.');
            }
        }   // success end
    })  // ajax end

}   // cartAdd() end

// 결제 창으로 이동
function purchase() {   console.log('purchase()');
    let productName = document.querySelector('.productName').innerText;     // 상품명 가져오기
    let productNum = document.querySelector('#productNum').value;           // 상품 구매 수량 가져오기

    console.log(productName);
    console.log(productNum);

    location.href=`/purchase?pno=${pno}&pnum=${productNum}`;
}   // purchase() end