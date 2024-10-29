console.log('comment.js');

function comment(){ console.log('comment()');

     let ccontent=document.querySelector('.ccontent').value; 
     let info={ccontent:ccontent,
                    bno:bno}
     console.log(info)
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result);
            if (result == '') {                 // 비로그인 상태인 경우
                alert('댓글쓰기 실패 :로그인 후 쓰기가 가능합니다.');    // 로그인 페이지로 이동
            }
            else { //else start
                $.ajax({ //ajax 2 st
                     async : true,
                     method:'post',
                     url:"/comment/comentb",
                     data:info,
                     success:(r)=>{ console.log(r);
                          console.log(result['uno'])
                          $.ajax({
                            async : false,
                            method : 'POST',
                            url : '/point/add',
                            data : {uno : result['uno']},
                            success : p => {
                                console.log(p)
                            }
                          })
                          if(r){alert('댓글쓰기 성공')
                          commentPrint();
                          document.querySelector('.ccontent').value=``
                          }else{alert('댓글쓰기 실패 :로그인 후 쓰기가 가능합니다.');}
                     },
                     error : (e) =>{
                          console.log(e);
                    }
                }) //ajax2 end
            } //else end
        }   // success end
    })  // ajax end

};

console.log('cprint.js');


commentPrint();
function commentPrint(){
    $.ajax({
         async:false,
         url:"/comment/cprint",
         method:"get",
         data:{bno:bno},
         success: (response) => {
            console.log(response);
            let commentBox = document.querySelector('.commentBox');
            let html = '';

            if (response.length === 0) {
                html = '<div>댓글이 없습니다.</div>';
            } else {
                response.forEach(comment => {
                    html += `
                            <div class="uid">${comment.id}</div>
                           <span class="cContent">${comment.ccontent}</span>
                           <span class="cdate">${comment.cdate}</span><br/><br/>
                    `;
                });
            }

            commentBox.innerHTML = html;
        },
        error: (e) => {
            console.error("댓글을 불러오는 데 실패했습니다:", e);
        }
    })



}









