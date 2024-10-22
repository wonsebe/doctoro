//console.log("report")

check()
read()
read2()

function read() {
$.ajax({
    async : false,
    method : 'get',
    url : '/admin/userall',
    success : (r) => {
//        console.log(r)
        let body = document.querySelector("#body")
        html = '';

        r.forEach(e => {
//            console.log(e)
            html += `<tr>
                     <td>${e.uno}</td>
                     <td>${e.id}</td>
                     <td>${e.name}</td>
                     <td>${e.gender}</td>
                     <td>${e.phone}</td>
                     <td>${e.ubirth}</td>
                     <td>${e.distinction}</td>
                     <td>${e.rno}</td>
                     </tr>`;
        })
        body.innerHTML = html;
        }
    })
}

function read2() {
$.ajax({
    async : false,
    method : 'get',
    url : '/admin/user/report',
    success : (r) => {
//        console.log(r)
        let body = document.querySelector("#body2")
        html = '';

        r.forEach(e => {
            html += `<tr>
                     <td>${e.runo}</td>
                     <td>${e.rudate}</td>`

            $.ajax({
                async: false,
                method : 'get',
                url : '/admin/userall',
                success : (u) => {
//                    console.log(u);
                    u.forEach(k => {
                        if(e.ruiun == k.uno){
//                        console.log(k.name);
                        html += `<td>${k.name}</td>`
                        }

                    })
                }
            })

            $.ajax({
                async: false,
                method : 'get',
                url : '/admin/userall',
                success : (u) => {
//                    console.log(u);
                    u.forEach(k => {
                        if(e.ruoun == k.uno){
//                        console.log(k.name);
                        html += `<td>${k.name}</td>`
                        }

                    })
                }
            })
            html += `</tr>`;
        })
        body.innerHTML = html;
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