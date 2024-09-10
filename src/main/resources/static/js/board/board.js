console.log('board.js');

print();
function print(){

    console.log('html');
    $.ajax({
        async:false,
        url: "/board/print",
        method:"get",
        success: r =>{
            console.log(r);
            let tbox= document.querySelector('#tbox');
            let html=''
            r.forEach(게시판 =>{
                
            html+=` 
                        <tr>
                        <th> ${게시판.bno} </th> 
                        <th> <a href="/board/detail.html"></a>${게시판.btitle}</th>
                        <th> ${게시판.uno} </th>
                        <th> ${게시판.bdate} </th> 
                        </tr>

             `
        })
            tbox.innerHTML=html;
            console.log(tbox);
        }
    })
}
