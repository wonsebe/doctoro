package web.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Vector;

@Component // 해당 클래스를 스프링 컨테이너 빈 등록
public class ChatController extends TextWebSocketHandler {
    private List<WebSocketSession> connClient= new Vector<>();
    //1. 클라이언트가 서버 웹소켓에 접속 성공 했을 때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("session = " + session);
        System.out.println("[서버웹소켓] JS 클라이언트 웹소켓이 들어옴");
        //접속된 클라이언트 소켓을 접속명단에 저장
        connClient.add(session);
        //현재 접속된 인원수
        System.out.println("서버소켓의 접속 인원 : "+connClient.size());

    }

    //2. 클라이언트가 서버 웹소켓에 접속 끊었을 때.
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("session = " + session);
        System.out.println("[서버웹소켓측] JS 클라이언트 웹소켓이 나감");
        //접속된 클라이언트소켓을 접속명단에서 제외
        connClient.remove(session);
        //현재 접속된 인원수
        System.out.println("서버소켓의 접속 인원: "+connClient.size());
    }
    // 3. 클라이언트가 서버 웹소켓에 메세지를 보냈을 때 // 서버가 메세지를 받을 때 이후 로직 구현

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("session = " + session);
        System.out.println(message.getPayload());
        //특정한 세션으로 받은 메세지 내용들 현재 접속된 다른 세션에게도 전달
            //모든 접속된 클라이언트소켓 하나씩 꺼내기
        for(int i=0; i<connClient.size(); i++){
            //2. 목록에 저장된 하나의 세션 호출
            WebSocketSession s= connClient.get(i);
            //3. 꺼낸 클라이언트소켓 정보에 메세지를 보내기
            s.sendMessage(message);
        }
    }
}
