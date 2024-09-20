console.log('Connect success')

total();

function total(page = 1){
    $.ajax({
        async : false,
        url : 'http://localhost:5000/rank',
        method : 'GET',
        data : { page : page } ,
        success : r => {
            //console.log(r);
            let tbody = document.querySelector('#tbody');
            let html = '';
            r.forEach(e => {
                $.ajax({
                    async : false,
                    url : '/rank/total',
                    method : 'GET',
                    data : { pno : e.아이디 }  ,
                    success : r2 => {
                        //console.log(r2);
                            html += `<tr>
                                <td>${e.아이디}</td> <td> <img width=140px src = ${e.이미지} /></td> <td>${e.한글이름}</td> `
                            html += `<td>${r2.win}</td> <td>${r2.click} </tr>`

                    }
                })
            });
            tbody.innerHTML = html;

            let paginationBox = document.querySelector('.pagination');
                        let pageHTML = '';


                        for (let i = 0; i <= 10; i++) { //for start 반복문을 돌려서
                            pageHTML += `
                            <li class="page-item${i}">
                            <a class="page-link" href="#" onclick="total(${i+1})">${i + 1}</a>
                            </li>
                            `;
                            //페이지의 번호와 데이터에 맞는 버튼 생성

                        } //for end


                        //페이지네이션 버튼출력


                        paginationBox.innerHTML = pageHTML;
        }
    })
}
