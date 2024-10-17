console.log("inventory")

read()
// 상품 전체 출력
function read(){
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
                <td> <input type="checkbox" class="checko" value=${e.product_no}> </td>
                <td>${e.product_no}</td>
                <td>${e.product_name}</td>
                <td>${e.price}</td>
                <td>${e.product_image}</td>
                <td>${e.product_description}</td>
                <td>${e.pcategory_name}</td>
             </tr>`;
         })
         //저장
        item.innerHTML = html
        }
    })
}

function invadd(){

    let name = document.querySelector("#name").value;
    console.log(name)
    let price = document.querySelector("#price").value;
    let file = document.querySelector("#file").value;
    let info = document.querySelector("#info").value;
    let category = document.querySelector("#category").value;
    console.log(category)

    let v1 = {product_name:name,
                price:price,
                product_image:file,
                product_description:info,
                pcategory_no:category}

    console.log(v1)

    $.ajax({
        async : false,
        method : 'post',
        url : '/admin/invadd',
        data : v1,
        success : (r) => {
            console.log(r)
            read()
        },
        error : (r) => {console.log(r)},
    })
}

function invdel(){
    console.log("del")
    let check = document.querySelectorAll('.checko:checked');

    check.forEach(c  => {
        console.log(c.value)
    })

}