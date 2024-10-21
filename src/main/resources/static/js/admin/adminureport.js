console.log("report")

read()
function read() {
$.ajax({
    async : false,
    method : 'get',
    url : '/admin/userall',
    success : (r) => {
        console.log(r)
        let body = document.querySelector("#body")
        html = '';

        r.forEach(e => {
            console.log(e)
            html += `<tr>
                     <td>${e.uno}</td>
                     <td>${e.id}</td>
                     <td>${e.name}</td>
                     <td>${e.gender}</td>
                     <td>${e.phone}</td>
                     <td>${e.ubirth}</td>
                     <td>${e.distinction}</td>
                 </tr>`
        })
        body.innerHTML = html;
        }
    })
}