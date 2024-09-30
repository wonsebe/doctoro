package web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import web.controller.ChatController;

@Configuration//해당 클래스를 스프링 컨테이너 빈 등록
@EnableWebSocket //웹소켓 빈 등록 //gradle에 웹소켓 관련 코드 넣어야함.
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired private ChatController chatController;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatController, "/chat/conn");
//        registry.addHandler('헨들러객체', 'ws서버소켓주소');
    }
}