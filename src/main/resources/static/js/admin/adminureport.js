console.log("report")

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
                     <td>${e.distinction}</td>`

            $.ajax({
               async : false,
               method : 'get',
               url : '/admin/report/count',
               success : (p) => {
                   console.log(p)

                   p.forEach(z => {
                   console.log(z)
                   if(e.uno == z.ruoun){
                   html += `<td>${z.rno}</td>`
                   }
                   if(z.ruoun === undefined){
                   html += `<td>0</td>`
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