console.log("orders")

check()
read()
read2()

function read(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/admin/orderall',
        success : (result) => {
            console.log(result)
            let tbody = document.querySelector("#tbody")
            html = '';
            status = " "
            result.forEach(e => {
                console.log(e)
                if( e.order_status==0){status = "완료"}
                else if( e.order_status==1){status = "환불"}

                html += `<tr>
                            <td>${e.odetail_no}</td>
                            <td>${e.order_date}</td>
                            <td>${e.name}</td>
                            <td>${e.product_name}</td>
                            <td>${status}</td>
                            <td><button type="button" id="change" onclick="change(${e.odetail_no})"> 변경 </button></td>
                        </tr>`;
            })
            tbody.innerHTML = html;
        }
    })
}

function read2(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/admin/delivery',
        success : (r) => {
            console.log(r)
            let tbody2 = document.querySelector("#tbody2")
            html = '';

            r.forEach(e => {
                console.log(e)
                html += `<tr>
                             <td>${e.delivery_no}</td>
                             <td>${e.delivery_status}</td>
                             <td>${e.delivery_date}</td>
                             <td>${e.order_no}</td>
                         </tr>`;
            })
            tbody2.innerHTML = html;
        }
    })
}

function change(orderNo, ){
    console.log("change")
    console.log(orderNo)
    $.ajax({
        async : false,
        method : 'PUT',
        url : '/admin/change',
        data : {odetail_no:orderNo},
        success : r => {
            console.log(r);
            read()
            read2()
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