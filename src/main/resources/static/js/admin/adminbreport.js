//console.log("boardReport")

check()
read()
read2()

function read(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/admin/board/repot',
        success : (r) => {
            console.log(r)
            let body = document.querySelector("#body")
            html = '';

            r.forEach(e => {
            console.log(e);
                html += `<tr>
                             <td>${e.bno}</td>
                             <td>${e.btitle}</td>
                             <td>${e.bcontent}</td>
                             <td>${e.bdate}</td>
                             <td>${e.bview}</td>
                             <td>${e.name}</td>
                             <td>${e.categoryname}</td>
                             <td>${e.rno}</td>
                         </tr>`
            })
            body.innerHTML = html
        }
    })
}

function read2(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/admin/comment/repot',
        success : (r) => {
            console.log(r)
            let body = document.querySelector("#body2")
            html = '';

            r.forEach(e => {
                console.log(e);
                html += `<tr>
                             <td>${e.cno}</td>
                             <td>${e.ccontent}</td>
                             <td>${e.cdate}</td>
                             <td>${e.btitle}</td>
                             <td>${e.name}</td>
                             <td>${e.rpno}</td>
                         </tr>`
            })
            body.innerHTML = html
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