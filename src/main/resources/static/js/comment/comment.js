console.log('comment.js');

function comment(){ console.log('comment()');

     let ccontent=document.querySelector('.ccontent').value; 
     let info={ccontent:ccontent,
                    bno:bno}
     console.log(info)

    $.ajax({
         async : true,
         method:'post',
         url:"/comment/comentb",
         data:info, 
         success:(r)=>{ console.log(r);
              if(r){alert('댓글쓰기 성공')
                   document.querySelector('.ccontent').value=``
              }else{alert('댓글쓰기 실패 :로그인 후 쓰기가 가능합니다.');}
         },
         error : (e) =>{
              console.log(e);
        }

    })
 
    
};






