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

// 장바구니 등록
function cartAdd() {    console.log('cartAdd()');
    let productNum = document.querySelector('#productNum').value;
    console.log(productNum);
    console.log(typeof(productNum));

    if (typeof(productNum) == Number) {
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
    
                    let html = ``;
                    productNum.innerHTML = html;
                } else {
                    alert('장바구니 등록에 실패하였습니다. 다시 시도해주십시오.');
                }
            }   // success end
        })  // ajax end
    } else {
        alert('숫자를 입력해주십시오.');
    }

}   // cartAdd() end

