console.log('chatbot.js');

function roChat(){
    console.log('roChat()');
    let text=document.querySelector('.text').value;
    console.log(text);

    $.ajax({
        async:false,
        url:'http://127.0.0.1:5000/chatbot/seq2seq',
        method:'get',
        data:{
            text:text
        },
        success:function(response){
            console.log(response);
            console.log('서버 응답: ', response);
            let cPrint=document.querySelector('.cPrint')
            let html= cPrint.innerHTML;
            html += `<div class="userC">유저: ${text}</div><br/>`
            html +=` <div class="botC">로토봇의 답변:${response}</div> <br/>`
            cPrint.innerHTML=html;
            
        },
        error: function(error) {
            console.error('오류 발생:', error);
        }
        

    })
  






}