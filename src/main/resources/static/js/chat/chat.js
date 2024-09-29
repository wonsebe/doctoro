console.log('chat.js');

//// 1. 로그인 체크
//doLoginCheck();
//function doLoginCheck() {   console.log('doLoginCheck');
//    $.ajax({
//        async : false,
//        method : 'get',
//        url : '/user/login/check',
//        success : (result) => {     console.log(result);
//            if (result == '') {                 // 비로그인 상태인 경우
//                alert("로그인 후 이용 가능합니다.");
//                location.href="/user/login";    // 로그인 페이지로 이동
//            }
//        }   // success end
//    })  // ajax end
//}   // doLoginCheck() end

// JS 클라이언트 웹소켓 # new WebSocket("ws://localhost:8080/ws매핑주소")
let clientSocket=new WebSocket("ws://localhost:8080/chat/conn")
console.log(clientSocket)

// (1) WebSocket객체내 onopen 속성은 서버소켓과 접속을 성공했을때 발동되는 함수 정의해서 대입
clientSocket.onopen=(e)=>{
    console.log("서버소켓과 연결 성공");
}
//(2) WebSocket객체내 onmessage 속성은 서버소켓이 메시지를 보내왔을때 발동되는 함수 정의해서 대입
clientSocket.onmessage=(e)=>{
    console.log(e);
}

// [2] 메시지 전송 이벤트
function messageSend(){
    console.log('messageSend() called')
    //현재 클라리언트 소켓과 연결 유지된 서버소켓에게 메세지 전송
    clientSocket.send("hi ServerSocket")

}