console.log('chatbot.js');


function roChat() {
    console.log('roChat()');
    let text = document.querySelector('.text').value;
    console.log(text);

    $.ajax({
        async: false,
        url: 'http://127.0.0.1:5000/chatbot/seq2seq',
        method: 'get',
        data: {
            text: text
        },
        success: function (response) {
            console.log(response);
            console.log('서버 응답: ', response);
            let cPrint = document.querySelector('.cPrint')
            let html = cPrint.innerHTML;
            html += `<div class="userC">유저: ${text}</div><br/>`
            html += ` <div class="botC">로토봇의 답변:${response}</div> <br/>`
            cPrint.innerHTML = html;

            if (response.includes("채팅 페이지")) {
                setTimeout(() => {
                    location.href = "/chat";
                }, 1500);
            } else if (response.includes("종족 값 페이지")) {
                setTimeout(() => {
                    location.href = "/base/stats/print";
                }, 1500);
            } else if (response.includes("게시판 페이지")) {
                setTimeout(() => {
                    location.href = "/board/bprint";
                }, 1500);
            } else if (response.includes("쇼핑 페이지")) {
                setTimeout(() => {
                    location.href = "/product";
                }, 1500);
            } else if (response.includes("투표 페이지")) {
                setTimeout(() => {
                    location.href = "/rank/enter";
                }, 1500);
            } else if (response.includes("포인트 충전 페이지")) {
                setTimeout(() => {
                    location.href = "/point/charge";
                }, 1500);
            } else if (response.includes("승률 예측 페이지")) {
                setTimeout(() => {
                    location.href = "/rate";
                }, 1500);
            }

        },
        error: function (error) {
            console.error('오류 발생:', error);
        }


    })







}