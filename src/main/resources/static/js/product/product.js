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

            result.forEach(상품 => {
                html += `
                        <div>
                            <div> <a href="/product/detail?pno=${상품.product_no}">${상품.product_image}</a> </div>
                            <div> <a href="/product/detail?pno=${상품.product_no}">${상품.product_name}</a> </div>
                            <div>${상품.product_description}</div>
                            <div>${상품.price}</div>
                            <div>${상품.pcategory_name}</div>
                        </div>
                        `
            })

            productAll.innerHTML = html;

        }   // success end
    })  // ajax end
}   // productAllPrint() end
