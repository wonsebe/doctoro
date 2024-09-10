console.log('Connect success')

total();

poketmondata = []
function total(){
    $.ajax({
        async : false,
        url : 'http://localhost:5000/rank',
        method : 'GET',
        success : r => {
            console.log(r);
            let tbody = document.querySelector('#tbody');
            let html = '';
            r.forEach(e => {
                html += `<tr>
                            <td>${e.아이디}</td> <td> <img width=140px src = ${e.이미지} /></td> <td>${e.한글이름}</td> <td>${e.win}</td> <td>${e.click}</td>
                         </tr>`
            });
            tbody.innerHTML = html;
        }
    })
}

function get(){
    async : false,
    url : '/rank/total',
    method : 'GET',
    success : z => {
        console.log(z);
        z.forEach(e => {
            poketmondata.push(e);
        })
    }
}