const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// 챗봇 열기 이벤트 추가
chatbotToggler.addEventListener("click", doLoginCheck);

function doLoginCheck() {
    console.log('doLoginCheck');
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/login/check',
        success: (result) => {
            console.log(result);
            if (result == '') { // 비로그인 상태인 경우
                alert("로그인 후 이용 가능합니다.");
                location.href = "/user/login"; // 로그인 페이지로 이동
            } else {
                document.body.classList.toggle("show-chatbot"); // 로그인 상태일 때 챗봇 열기
            }
        } // success end
    }); // ajax end
} // doLoginCheck() end

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing"
        ? `<p></p>`
        : ` <img src="/img/로토무얼굴.png" class="material-symbols-outlined" /><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const roChat = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    const text = userMessage; // 사용자의 메시지를 사용
    console.log('roChat()');
    console.log(text);

    $.ajax({
        async: false,
        url: 'http://127.0.0.1:5000/chatbot/seq2seq',
        method: 'get',
        data: { text: text },
        success: function(response) {
            console.log(response);
            messageElement.textContent = response; // 챗봇의 답변을 표시

            // 페이지 전환 로직
            if (response.includes("채팅 페이지")) {
                setTimeout(() => location.href = "/chat", 1500);
            } else if (response.includes("종족 값 페이지")) {
                setTimeout(() => location.href = "/base/stats/print", 1500);
            } else if (response.includes("게시판 페이지")) {
                setTimeout(() => location.href = "/board/bprint", 1500);
            } else if (response.includes("쇼핑 페이지")) {
                setTimeout(() => location.href = "/product", 1500);
            } else if (response.includes("투표 페이지")) {
                setTimeout(() => location.href = "/rank/enter", 1500);
            } else if (response.includes("포인트 충전 페이지")) {
                setTimeout(() => location.href = "/point/charge", 1500);
            } else if (response.includes("승률 예측 페이지")) {
                setTimeout(() => location.href = "/rate", 1500);
            }
                setTimeout(() => {
                    location.href = "/rate";
                }, 1500);
            } else if (response.includes("포켓몬 랭킹 페이지")) {
                setTimeout(() => {
                    location.href = "/rank/get";
                }, 1500);
            }else if (response.includes("포인트 내역")) {
                $.ajax({
                    async: false,
                    method: "get",
                    url: "/point/raed",
                    data: user_info,
                    success: r => {
                        console.log(r)
                        html += ` <div class="botC">로토봇의 답변: 현재 포인트는 ${r} 입니다. </div> <br/>`

                        cPrint.innerHTML = html;
                    }
                })
            } else if (response.includes("장바구니 내역")) {
                $.ajax({
                    async: false,
                    method: "get",
                    url: "/cart/select_five",
                    data: user_info,
                    success: r => {
                        r.forEach(e=>{
                            html += ` <div class="botC">${e.cart_no}번 제품 : ${e.product_name}, 수량 : ${e.cart_product_quantity}개, 개당 가격 : ${e.price}원  </div> <br/>`
                        })
                        html += `<div class="botC">로토봇의 답변: 장바구니 내역 상위 5개를 출력해드렸습니다. </div> <br/>`
                        cPrint.innerHTML = html;
                    }
                })
            } else if (response.includes("주문 내역")) {
                $.ajax({
                    async: false,
                    method: "get",
                    url: "/order/select_five",
                    data: user_info,
                    success: r => {
                        r.forEach(e=>{
                            if (e.order_state == "0"){
                                orderState = "완료"
                            }else{
                                orderState = "환불"
                            }

                            html += ` <div class="botC">주문 번호 : ${e.order_no}번, 제품 이름 : ${e.product_name}, 날짜 : ${e.order_date}, 주문 상태 : ${orderState}, 가격 : ${e.price}원 </div> <br/>`
                        })
                        html += `<div class="botC">로토봇의 답변: 주문 내역 상위 10개를 출력해드렸습니다. </div> <br/>`
                        cPrint.innerHTML = html;
                    }
                })
            } else if (response.includes("마이 페이지 정보")) {
                $.ajax({
                    async: false,
                    method: "get",
                    url: "/user/my/info_chatbot",
                    data: user_info,
                    success: result => {
                        html += `
                        <div class="botC">아이디 : ${result.id}</div>
                        <div class="botC">이름 : ${result.name}</div>
                        <div class="botC">성별 : ${result.gender}</div>
                        <div class="botC">전화번호 : ${result.phone}</div>
                        <div class="botC">생년월일 : ${result.ubirth}</div>
                        <div class="botC">주소 : ${result.address}</div>`

                        html += `<div class="botC">로토봇의 답변: 회원님의 마이 페이지 정보를 출력해드렸습니다. </div> <br/>`
                        cPrint.innerHTML = html;
                    }
                })
            }
        },
        error: function(error) {
            console.error('오류 발생:', error);
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }
    });
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        roChat(incomingChatLi); // roChat 함수 호출
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
