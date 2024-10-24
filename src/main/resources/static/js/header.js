console.log('header.js');

let loginNo = 0;    // 현재 로그인된 유저 번호
console.log(loginNo);

// 1. 로그인 체크
doLoginCheck();
function doLoginCheck() {
    console.log('doLoginCheck');
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/login/check',
        success: (result) => {
            console.log(result);
            let html = '';
            loginNo = result['uno']     // 현재 로그인된 유저 번호 저장

            // 로그인 상태에 따른 메뉴 구성
            if (result == '') {
                // 비로그인 상태인 경우
                console.log('비로그인');
                html += `
                        <li> <a href="/product">상품</a> </li>
                        <li> <a href="/info">정보</a> </li>
                        <li> <a href="/rate">확률</a> </li>
                        <li> <a href="/base/stats/print">종족값</a> </li>
                        <li> <a href="/rank/enter">투표</a> </li>
                        <li> <a href="/rank/get">랭킹보기</a> </li>
                        <li> <a href="/board/bprint">게시판</a> </li>
                        <li> <a href="/chat">채팅방</a> </li>
                        <li> <a href="/user/login">로그인</a> </li>
                        `
            } else {
                // 로그인한 상태인 경우
                console.log('로그인');
                console.log(loginNo)
                if(loginNo == 1){
                html += `
                         <li> <a href="/adminmain">관리자</a> </li>
                         <li> <a href="/weather">날씨</a> </li>
                         <li> <a href="/product">상품</a> </li>
                         <li> <a href="/info">정보</a> </li>
                         <li> <a href="/rate">확률</a> </li>
                         <li> <a href="/base/stats/print">종족값</a> </li>
                         <li> <a href="/rank/enter">투표</a> </li>
                         <li> <a href="/rank/get">랭킹보기</a> </li>
                         <li> <a href="/board/bprint">게시판</a> </li>
                         <li> <a href="/chat">채팅방</a> </li>
                         <li> <a href="/user/myinfo">마이페이지</a> </li>
                         <li> <a href="/cart">장바구니</a> </li>
                         <li> <a href="/order">주문내역</a> </li>
                         <li> <a href="#" onclick="doLogout()">로그아웃</a> </li>
                        
                         `
                         }
                else {
                html += `
                        <li> <a href="/weather">날씨</a> </li>
                        <li> <a href="/product">상품</a> </li>
                        <li> <a href="/info">정보</a> </li>
                        <li> <a href="/rate">확률</a> </li>
                        <li> <a href="/base/stats/print">종족값</a> </li>
                        <li> <a href="/rank/enter">투표</a> </li>
                        <li> <a href="/rank/get">랭킹보기</a> </li>
                        <li> <a href="/board/bprint">게시판</a> </li>
                        <li> <a href="/chat">채팅방</a> </li>
                        <li> <a href="/user/myinfo">마이페이지</a> </li>
                        <li> <a href="/cart">장바구니</a> </li>
                        <li> <a href="/order">주문내역</a> </li>
                        <li> <a href="#" onclick="doLogout()">로그아웃</a> </li>
                        `
                }
            }
            document.querySelector('#headerMenu').innerHTML = html;
        }   // success end
    })  // ajax end
}   // doLoginCheck() end

// 2. 로그아웃
function doLogout() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/logout',
        success: (result) => {
            console.log(result);
            alert('로그아웃 완료')
            location.href = "/"
        }
    })
}
