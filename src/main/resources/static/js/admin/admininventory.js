console.log("inventory")

// 상품 전체 출력
$.ajax({
    async : false,
    method : 'get',
    url : '/admin/main',
    success : (result) => {
     console.log(result);
     //어디에
     let item = document.querySelector("#body")
     html = '';
     //무엇을
     result.forEach(e => {
        console.log(e)
         html += `<tr>
            <th>${e.product_no}</th> <th>${e.product_name}</th> <th>${e.price}</th> <th>${e.product_image}</th> <th>${e.product_description}</th> <th>${e.pcategory_name}</th>
         </tr>`;
     })
     //저장
    item.innerHTML = html
    }
})
