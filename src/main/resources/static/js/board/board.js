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
            let printBox= document.querySelector('#printBox');
            let html=''
            r.forEach(내용 =>{
                
            html+=` 
                        <tr> <th> ${내용.bno} </th> 
                        <th> <a href="/board/detail.html"></a>${내용.btitle}</th></tr><br/>
             `
        })
            printBox.innerHTML=html;
            console.log(printBox)
        }
    })
}
