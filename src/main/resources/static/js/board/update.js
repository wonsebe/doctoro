console.log('update.js');

function updateB(){
    console.log(updateB);
    let btitle=document.querySelector('.btitle').value
    let bcontent=document.querySelector('.bcontent').value
    let categoryno=document.querySelector('.categoryno').value;

    $.ajax({
        url:'/board/update',
        method:'put',
        data:{ btitle: btitle,
            bcontent:bcontent,
            categoryno:categoryno
        },
        success: (result) =>{
            console.log(result);
        },
        error : (e) =>{
            console.log(e);
      }
    })
}