console.log('header.js');

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
            let uno = result['uno']
            let gender = result['gender']
            let ubirth = result['ubirth']

            if(uno && gender && ubirth) {
                $.ajax({
                    async: false,
                    method: 'post',
                    url: 'http://localhost:5000/model',
                    data : JSON.stringify({uno : uno, gender : gender ,ubirth : ubirth}),
                    contentType : 'application/json',
                    success: (r) => {
                        console.log(r);
                    },
                    error: (xhr, status, error) => {
                        console.error('Error:', error);
                        }
                })
            }
            // 로그인 상태에 따른 메뉴 구성
            if (result == '') {
                // 비로그인 상태인 경우
                console.log('비로그인');
                html += `
                        <li> <a href="/info">정보</a> </li>
                        <li> <a href="/rate">확률</a> </li>
                        <li> <a href="/base/stats/print">종족값</a> </li>
                        <li> <a href="/rank/tnm">이상형월드컵</a> </li>
                        <li> <a href="/rank/get">랭킹보기</a> </li>
                        <li> <a href="/board/bprint">게시판</a> </li>
                        <li> <a href="/user/login">로그인</a> </li>
                        <li> <a href="/user/signup">회원가입</a> </li>
                        `
            } else {
                // 로그인한 상태인 경우
                console.log('로그인');
                html += `
                        <li> <a href="/info">정보</a> </li>
                        <li> <a href="/rate">확률</a> </li>
                        <li> <a href="/base/stats/print">종족값</a> </li>
                        <li> <a href="/rank/tnm">이상형월드컵</a> </li>
                        <li> <a href="/rank/get">랭킹보기</a> </li>
                        <li> <a href="/board/bprint">게시판</a> </li>
                        <li> <a href="/user/myinfo">마이페이지</a> </li>
                        <li> <a href="#" onclick="doLogout()">로그아웃</a> </li>
                        `
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
