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


