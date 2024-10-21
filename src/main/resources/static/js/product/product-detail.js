console.log('product-detail.js');

let urlParams = new URL(location.href).searchParams;
let pno = parseInt(urlParams.get("pno"));

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

            html += `
                    <div>
                        <div>${result.product_image}</div>
                        <div>${result.product_name }</div>
                        <div>${result.product_description}</div>
                        <div>${result.price}</div>
                        <div>${result.pcategory_name}</div>
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

