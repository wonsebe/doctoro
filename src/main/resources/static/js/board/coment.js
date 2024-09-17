console.log('coment.js');

function coment(){ console.log('coment()');

    let ccontent=document.querySelector('.ccontent').value; 
    let info={
         ccontent:ccontent,
         bno:bno
    }; 
    $.ajax({
         async : true,
         method:'post',
         url:"/coment/comentb",
         data:info,
         success:r=>{
              if(r==true){alert('댓글쓰기 성공')
                   document.querySelector('.ccontent').value=``
              }else{alert('댓글쓰기 실패 :로그인 후 쓰기가 가능합니다.');}
         },
         error : (e) =>{
              console.log(e);
        }

    })
    
};


commentPrint();
function commentPrint(){ console.log(commentPrint());
    let printBox=document.querySelector('.printBox');
    
    let html='';
    $.ajax({
         async:false,
         url:"/comment/cprint",
         method:"get",
         success:r=>{
              r.forEach(댓글 =>{
                   html+=`<div class="uno">${댓글.uid}
                          <div class="ccontent">${댓글.ccontent}
                          <div class="cdate">${댓글.cdate}`
              });
              printBox.innerHTML=html;
         }

    })
}