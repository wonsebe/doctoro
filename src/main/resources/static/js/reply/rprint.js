console.log('rprint.js');
print();
function print(){
   
    $.ajax({
        async:false,
        url:"/reply/print",
        method:"get",
        data:{cno:cno},
        success:(r)=>{console.log(r);
            let rplyPrint=document.querySelector('.rplyPrint');
            let html = '';
            if (response.length === 0) {
                html = '<div>대댓글이 없습니다.</div>';
            } else {
                response.forEach(reply => {
                    html += `
                              <div id="rid">${reply.id}</div>
                              <div id="rcontent">${reply.rcontent}</div>
                              <div id="rdate">${reply.rdate}</div> <br/>`;
                });
            }

            rplyPrint.innerHTML = html;
        },
        error: (e) => {
            console.error("댓글을 불러오는 데 실패했습니다:", e);
        }
        
    })
}
