console.log('delete.js');

function deleteB(){
    $.ajax({
        url:"/board/delete",
        method:'delete',
        data:{bno:bno},
        success:  (result) =>{
            console.log(result);
            result=confirm('게시물을 정말 삭제할까요?')
            if(result){
                alert('삭제성공')
                location.href='/board/bprint';
            }else{
                alert('삭제실패')
            }console.log(result);
        },
        error : (e)=>{ console.log(e); }
        
    })

}