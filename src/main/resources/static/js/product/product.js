console.log('product.js');

// 상품 전체 출력
productAllPrint();
function productAllPrint() {    console.log('productAllPrint()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/product/all/print',
        success : (result) => {     console.log(result);
            let productAll = document.querySelector('#productAll');
            let html = ``;

            html += `
                    <div>${result.product_image}</div>
                    <div>${result.product_name}</div>
                    <div>${result.product_description}</div>
                    <div>${result.price}</div>
                    <div>${result.pcategory_no}</div>
                    `

            productAll.innerHTML = html;

        }   // success end
    })  // ajax end
}   // productAllPrint() end
