console.log('write.js');

function rwrite(){ console.log('rwrite()');
    let rcontent=document.querySelector('.rcontent').value; 
    
    $.ajax({
        url:"/reply/write",
        method:'post',
        data:{rcontent:rcontent,cno:cno},
        success: (r)=>{
            console.log(r);
            if(r){
                alert('답글이 등록되었습니다.')
                
                location.href="/board/bdetail";
            }else{
                alert('답글이 정상적으로 처리되지 않았습니다.');
            }
        },
        error : (e) =>{
            console.log(e);
      }

    })
}
//한 번 누르면 답글 인풋박스 등장, 두 번 누르면 인풋박스 사라짐
