console.log("product")

check()
read()
category()
allprod()

function read(){
    $.ajax({
        async: false,
        method : 'get',
        url : '/admin/product',
        success : (r) => {
            console.log(r)

            let body = document.querySelector("#body")
            html = '';

            r.forEach(e => {
                console.log(e)
                html += `<tr>
                             <td>${e.inventory_no}</td>
                             <td>${e.inventory_indecrease}</td>
                             <td>${e.inventory_date}</td>
                             <td>${e.inventory_reason}</td>
                             <td>${e.product_name}</td>
                        </tr>`;
            })
            body.innerHTML = html;
        }
    })
}

function category(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/admin/main',
        success : (r) => {
            console.log(r)
            let prodinv = document.querySelector("#prodinv")
            html = '';
            r.forEach(e => {
                html += `<option value=${e.product_no}> ${e.product_name} </option>`;
            })
            prodinv.innerHTML = html;
        }
    })
}

function prodadd(){
//console.log('prod')
    let prodpm = document.querySelector("#prodpm").value;
    let prodinfo = document.querySelector("#prodinfo").value;
    let prodinv = document.querySelector("#prodinv").value;

    console.log(prodpm)
//    console.log(prodinfo)
    console.log(prodinv)

    if(prodinfo == 1){prodinfo = "재고등록"}
    console.log(prodinfo)
//
//    console.log(prodinv)

    let v3 = {inventory_indecrease:prodpm,inventory_reason:prodinfo,product_no:prodinv}
    console.log(v3)

    $.ajax({
        async: false,
        method : "POST",
        url : "/admin/prodadd",
        data : v3,
        success : (r) => {
            console.log(r)
            alert("재고 등록 성공")
            read()
            allprod()
        }
    })
}

function allprod(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/admin/prodall',
        success : (r) => {
            console.log(r)
            let body2 = document.querySelector("#body2")
            html = '';
            r.forEach(e => {
                html += `<tr>
                             <td>${e.product_name}</td>
                             <td>${e.product_count}</td>
                        </tr>`;
            })
            body2.innerHTML = html;
        }
    })
}


function check(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (r) => {
            if(r.uno==1){
//            console.log(r)
//            alert("로그인 성공")
            }
            else{
            alert("접근 불가능한 페이지입니다.")
            location.href="/user/login"
            }
        }
    })
}