console.log('boardCount.js');
let btitle = new URL( location.href ).searchParams.get('btitle');
let bcontent = new URL( location.href ).searchParams.get('bcontent');
function count(){

$.ajax({
    async : false ,
    url:'/board/wordCount',
    method:'get',
    data:{btitle:btitle,
        bcontent:bcontent},
        success: function(response) {
        console.log(response);
        $.ajax({
            url:'http://127.0.0.1:5000/board/wordCount',
            method:'get',
            data:{btitle:response},
            success : r => { console.log(r);
                if(r){
                    console.log('내용있다');
                }else{
                    console.log('내용없다.');
                }
            }//s e
        })//a e
    }// s e

})// a e

}//f e