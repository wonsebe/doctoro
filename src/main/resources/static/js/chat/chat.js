console.log('chat.js');
let randomNo=Math.floor(Math.random() *1001) +1 //1~1000명까지의 난수를 설정
let nick=`회원${randomNo}`
console.log(nick);

// 1. 로그인 체크
doLoginCheck();
function doLoginCheck() {   console.log('doLoginCheck');
   $.ajax({
       async : false,
       method : 'get',
       url : '/user/login/check',
       success : (result) => {     console.log(result);
           if (result == '') {                 // 비로그인 상태인 경우
               alert("로그인 후 이용 가능합니다.");
               location.href="/user/login";    // 로그인 페이지로 이동
           }
       }   // success end
   })  // ajax end
}   // doLoginCheck() end

// JS 클라이언트 웹소켓 # new WebSocket("ws://localhost:8080/ws매핑주소")
let clientSocket=new WebSocket("ws://localhost:8080/chat/conn")
console.log(clientSocket)

// (1) WebSocket객체내 onopen 속성은 서버소켓과 접속을 성공했을때 발동되는 함수 정의해서 대입
clientSocket.onopen=(e)=>{
    // console.log("서버소켓과 연결 성공");
    let msg={
        'type': 'alarm', //(알림 메세지)
        'message': `${nick}님이 입장 했습니다.`
    
    }
    //2. 보내기
    clientSocket.send(JSON.stringify(msg));

}
//(2) WebSocket객체내 onmessage 속성은 서버소켓이 메시지를 보내왔을때 발동되는 함수 정의해서 대입
clientSocket.onmessage=(messageEvent)=>{
    console.log(messageEvent);
    console.log(messageEvent.data) // 받은 내용물이 들어있는 속성
    //1. 받은 메세지를출력할 HTML 호출
    let messageBox=document.querySelector('.messageBox')
    //2. 받은 메세지의 내용물 ( .data 속성 ) 를 HTML 에 대입
    msg=JSON.parse(messageEvent.data) //JSON.parse(문자열) : 문자열타입(JSON 형식) 클라이언트 서버에 출력시키기 위해
    console.log(msg);
        //2-1 알람 메세지
    if(msg.type == 'alarm'){
        messageBox.innerHTML += `<div class="alarmMsgBox">
                                    <span> ${msg.message}</span><br/>
                                </div>`;
         return //알람 메세지를 HTML 출력 후 일반 메세지 HTML 코드가 실행되지 않도록 함수 종료
    }
    if (msg.message.trim() === "") {
        // 메시지가 공백일 경우, 처리하지 않고 리턴
        alert('글을 입력해주세요')
        return;
    }
    
    if (msg.from == nick) { // 내가 보낸 메시지
        messageBox.innerHTML += `<div class="fromMsgBox">
                                    <div id="user"> ${msg.from}</div>
                                    <div>
                                        <span> ${msg.date.split(' ')[4]}</span>
                                        <span class="message"> ${msg.message}</span>
                                    </div><br/>
                                </div>`;
    } else { // 남이 보낸 메시지
        messageBox.innerHTML += `<div class="toMsgBox">
                                    <div> ${msg.from}</div>
                                    <div>
                                         <span class="nam"> ${msg.message}</span>
                                         <span> ${msg.date.split(' ')[4]}</span>
                                    </div>
                                </div>`;
    }
    // 다른 사람이 보낸 메시지는 메시지가 먼저 보이고, 자신의 메시지는 시간 정보가 먼저 보이도록 설정된 것
}

// [2] 메시지 전송 이벤트
function messageSend(){
    // console.log('messageSend() called')
    //현재 클라리언트 소켓과 연결 유지된 서버소켓에게 메세지 전송
    // clientSocket.send("hi ServerSocket")
    let massageI=document.querySelector('.massageI')
    let msg={
        'type': 'msg', //(알림 메세지)
        'message': massageI.value,
        'from': nick,
        'date': new Date().toLocaleString()
    
    }
    //현재 클라이언트소켓과 연결 유지된 서버소켓에게 메세지 전송 #.send() : 서버소켓에게 메세지 전송
    clientSocket.send(JSON.stringify(msg));
    massageI.value="";

}