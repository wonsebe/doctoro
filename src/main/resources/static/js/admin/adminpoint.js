//console.log("point")

check()
read()

function read(){
    $.ajax({
        aysnc : false,
        method : 'get',
        url : '/admin/prtpoint',
        success : (r) => {
//            console.log(r);
            //어디에
            let pointlog = document.querySelector("#pointbd");
            html = '';
            //무엇을
            r.forEach(e => {
//                console.log(e)
                 html += `<tr>
                         <td>${e.point_no}</td>
                         <td>${e.point_indecrease}</td>
                         <td>${e.point_date}</td>
                         <td>${e.free_paid}</td>
                         <td>${e.point_reason}</td>
                         <td>${e.name}</td>
                     </tr>`;
            });
            //출력
            pointlog.innerHTML = html;
        }
    })
}

function pointadd(){
    console.log('pointadd')

    //값가져오기
    let price = document.querySelector("#price").value;
    let category = document.querySelector("#category").value;
    console.log(category) //1,2
    let info = document.querySelector("#info").value;
    let name = document.querySelector("#name").value;
    let uno = 0;
    //카테고리 값 변환
    if(category == 1){category = "무료"}
    else if(category == 2){category = "유료"}
    else{category = "미상"}

    console.log(category)

    $.ajax({
            aysnc : false,
            method : 'get',
            url : '/admin/user',
            success : (r) => {
                console.log(r);
                r.forEach(e => {
//                    console.log(e.name)
                    if(e.name == name){
                        let v2 = {point_indecrease:price,free_paid:category,point_reason:info,uno:e.uno}
                        $.ajax({
                                async: false,
                                method: 'post',
                                url: '/admin/addpoint',
                                data: v2,
                                success: (r) => {
                                    console.log(r);
                                    alert('포인트 추가 성공');
                                    read();
                                }
                            })

                    }
                    else{uno = 0}
                })
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