console.log('product-detail.js');

let urlParams = new URL(location.href).searchParams;
let pno = parseInt(urlParams.get("pno"));

// 상품 개별 조회 처리
productDetaillPrint();
function productDetaillPrint() {    console.log('productDetaillPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/product/detail/print',
        data : { productNo : pno },
        success : (result) => {     console.log(result);
            let productDetail = document.querySelector('#product-page');
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
                        <div class="product-image">
                            <img id="productImg" src="/img/${pFolderName}/${result.product_image}" />
                        </div>

                        <div class="product-info" id="productDetail">
                            <h2 class="productName">${result.product_name}</h2>
                            <p class="product-description"> ${result.product_description} </p>
                            <p class="product-category">카테고리: ${result.pcategory_name}</p>
                            <p class="product-price">${result.price.toLocaleString()}원</p>
                            <div class="product-quantity">
                                <label for="productNum">수량</label> </br>
                                <button type="button" class="quantity-btn" onclick="decreaseQuantity()">-</button>
                                <input type="text" id="productNum" value=1 onkeyup="productNumCheck()" />
                                <button type="button" class="quantity-btn" onclick="increaseQuantity()">+</button>
                            </div>

                            <div class="button-container">
                                <button type="button" class="cart-button" onclick="cartAdd()">장바구니 등록</button>
                                <button type="button" class="purchase-button" onclick="purchase()">구매하기</button>
                            </div>
                        </div>

                    <div>`
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
                document.querySelector('#productNum').value = 1;
                location.href="/cart"
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

// 장바구니 수량 증감
function increaseQuantity() {
    const quantityInput = document.getElementById("productNum");
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById("productNum");
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
}

// 상품 소개 탭 기능
function openTab(evt, tabName) {
    // 모든 탭 내용 숨기기
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    // 모든 탭 버튼의 active 클래스 제거
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 선택한 탭 내용 보여주기
    document.getElementById(tabName).classList.add('active');

    // 선택한 탭 버튼에 active 클래스 추가
    evt.currentTarget.classList.add('active');
}

// 초기 탭 열기
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tab-button.active').click();
});