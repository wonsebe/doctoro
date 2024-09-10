console.log('board.js');

print();
function print(){
    let printBox= document.querySelector('#printBox'); console.log(printBox)
    let html='' 
    console.log('html');
    $.ajax({
        url: 'get',
        method:'/board/print',
        success: response =>{
            console.log(response);
            html+=`<tr> <th> ${response.bno}  </th> 
            <th><a href="/board/detail?bno=${response.bno}">${response.btitle}</a>  </th> 
            <th> ${response.bcontent}  </th> <th> ${response.bdate}  </th> 
            <th> ${response.categoryno}  </th>  </tr>`

            console.log(response);
            printBox.innerHTML=html;
            
        }


    });
   



}
