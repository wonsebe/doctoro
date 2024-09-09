console.log('board.js');

print()
function print(){
    let boardWrap= document.querySelector('.boardWrap'); console.log(boardWrap)
    let html='' 
    console.log('html');
    $.ajax({
        url: 'get',
        method:'/board/print',
        success: response =>{
            console.log(response);
            html+=`<input id=${btitle} type="text"  placeholder="작성할 제목을 입력"/><br>
                    <textarea id=${bcontent} name="content" required  placeholder="작성할 내용을 입력"></textarea>`
        }

    })


}
