console.log('Connect success')

total();

function total(){
    $.ajax({
        async : false,
        url : 'http://localhost:5000/rank',
        method : 'GET',
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
        }
    })
}
