console.log('write.js');


function boardWrite(){
    let btitle=document.querySelector('#btitle').value;
    let bcontent=document.querySelector('#bcontent').value;
    // let categoryno=document.querySelector('#categoryno').value;
    //조회수도???

    let html='';
    console.log(html)

    $.ajax({
        url:'post',
        method:'write',
        data:{ btitle: btitle,
            bcontent:bcontent,
            // categoryno :categoryno
        },
        success: (result) =>{
            console.log(result);

        },
        error : (e) =>{
            console.log(e);
      }
      
    })




}