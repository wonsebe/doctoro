console.log('point-charge.js');

let chargePoint = 0;        // 충전하고자 하는 포인트

sumPoint(0);

// 로그인 체크
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

// 아임포트 결제 기능
function iamport(){     console.log('iamport()');
    //가맹점 식별코드
    IMP.init('imp28175316');                 // 실제 상점 아이디로 변경
    IMP.request_pay({
        //channelKey: "",
        pg : "html5_inicis",                        // 실제 계약 후에는 실제 상점아이디로 변경
        pay_method : 'CARD',                        // 'card'만 지원됨
        merchant_uid: "order_monthly_0001",         // 상점에서 관리하는 주문 번호
        name : '포인트 구매',                       // 결제창에 표시될 상품명.
        amount : Number(chargePoint),                       // 결제창에 표시될 금액. 실제 승인이 이루어지지는 않음 (모바일에서는 가격이 표시되지 않음)
        customer_uid : 'your-customer-unique-id',   // 필수 입력.
        buyer_email : 'doctoro@siot.do',
        buyer_name : '오박사의 연구소',
        buyer_tel : '010-0000-0000',
        m_redirect_url : '{모바일에서 결제 완료 후 리디렉션 될 URL}'    // 예: https://www.my-service.com/payments/complete/mobile
    }, function(rsp) {
        if ( rsp.success ) {
            alert('빌링키 발급 성공');
        } else {
            alert('빌링키 발급 실패');
            
            $.ajax({
                async : false,
                method : 'post',
                url : '/point/charge',
                data : { point_indecrease : chargePoint },
                success : (result) => {     console.log(result);
                    if (result) {
                        alert('포인트 충전이 완료되었습니다.');
                        location.href = "/user/myinfo";
                    } else {
                        alert('포인트 충전에 실패하였습니다. 다시 시도해주십시오.');
                    }
                }   // success end
            })  // ajax end

            // ajax 작성 후 맞춰서 넣기
            chargePoint = 0;
            sumPoint(0);
        }
    });
}   // iamport() end

// 포인트 누적
function sumPoint(point) {  console.log('sumPoint()');
    console.log(point);

    chargePoint += point;   // 클릭한 버튼에 맞춰 포인트 누적
    console.log(chargePoint);

    let chargePaidPoint = document.querySelector('#chargePaidPoint');
    let html = ``;

    html += `
            충전 금액 : ${chargePoint}원
            `
    chargePaidPoint.innerHTML = html;

}   // sumPoint() end

// 포인트 초기화 (버튼을 잘못 눌러 충전 금액이 올라간 경우, 다시 시도할 수 있도록 0원으로 설정)
function pointReset() {     console.log('pointReset()');
    chargePoint = 0;
    sumPoint(0);
}

