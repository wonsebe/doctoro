console.log('chatbot.js');


orderState = "";

user_info = {
    uno: 0
}


login_check();

function login_check() {
    $.ajax({
        async: false,
        url: "/user/login/check",
        method: "get",
        success: r => {
            console.log(r);
            console.log(r["uno"]);
            user_info["uno"] = r["uno"];
        }
    })
}




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
            } else if (response.includes("포켓몬 랭킹 페이지")) {
                setTimeout(() => {
                    location.href = "/rank/get";
                }, 1500);
            } else if (response.includes("포인트 내 역")) {
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
            } else if (response.includes("장바구니 내 역")) {
                $.ajax({
                    async: false,
                    method: "get",
                    url: "/cart/select_five",
                    data: user_info,
                    success: r => {
                        r.forEach(e => {
                            html += ` <div class="botC">${e.cart_no}번 제품 : ${e.product_name}, 수량 : ${e.cart_product_quantity}개, 개당 가격 : ${e.price}원  </div> <br/>`
                        })
                        html += `<div class="botC">로토봇의 답변: 장바구니 내역 상위 5개를 출력해드렸습니다. </div> <br/>`
                        cPrint.innerHTML = html;
                    }
                })
            } else if (response.includes("주문 내 역")) {
                $.ajax({
                    async: false,
                    method: "get",
                    url: "/order/select_five",
                    data: user_info,
                    success: r => {
                        r.forEach(e => {
                            if (e.order_state == "0") {
                                orderState = "완료"
                            } else {
                                orderState = "환불"
                            }

                            html += ` <div class="botC">주문 번호 : ${e.order_no}번, 제품 이름 : ${e.product_name}, 날짜 : ${e.order_date}, 주문 상태 : ${orderState}, 가격 : ${e.price}원 </div> <br/>`
                        })
                        html += `<div class="botC">로토봇의 답변: 주문 내역 상위 10개를 출력해드렸습니다. </div> <br/>`
                        cPrint.innerHTML = html;
                    }
                })
            } else if (response.includes("마이 페이지 정 보")) {
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
        error: function (error) {
            console.error('오류 발생:', error);
        }


    })







}