console.log('cupdate.js');

function update(){
    let ccontent=document.querySelector('.CContent');

    $.ajax({
        url:'/comment/cupdate',
        method:'put',
        data:{CContccent:ccontent},
        success: result =>{console.log(result)
            if(result){
                alert('수정성공');
            }else{
                alert('입력한 정보가 일치하지 않습니다.');
            }
        }

    })

}

