console.log('delete.js');

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

// 2. 회원 탈퇴 함수
function doDelete() {   console.log('doDelete()');
    // 1. 입력한 값 가져오기
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;
    let phone = document.querySelector('#phone').value;

    // 객체화
    let data = {
        id : id,
        password : pw,
        phone : phone
    }
    console.log(data);

    // ajax
    $.ajax({
        async : false,
        method : 'delete',
        url : '/user/delete',
        data : data,
        success : (result) => {     console.log(result);
            if (result) {
                alert('회원 탈퇴 성공');
                location.href="/"
            } else {
                alert('회원 탈퇴 실패');
            }
        }   // success end
    })  // ajax end
}   // doDelete() end

// 2. 전화번호 유효성 검사
function phoneCheck() {  console.log('phoneCheck()');
    // 1. 입력된 값 가져오기
    let phone = document.querySelector('#phone').value;
    let phoneInputCheck = document.querySelector('#phoneInputCheck');
    
    // 2. 정규표현식 : 00-0000-0000 또는 000-0000-0000
    let phoneRegex = /^(?:\d{2,3}-\d{3,4}-\d{4})$/;
    // let phoneRegex = /^(0[1-9]{1,2})+[-]([0-9]{3,4})+[-]([0-9]{4})$/;
    
    // 3. 정규표현식 검사
    console.log(phoneRegex.test(phone));

    let html = '';
    let doCheck = false;

    // 4. 정규표현식을 만족하지 않으면 if문 실행
    if (!phoneRegex.test(phone)) {
        html = '00-0000-0000 또는 000-0000-0000 형식으로 입력해주세요.';
        doCheck = false;
    } else {
        doCheck = true;
    }
    phoneInputCheck.innerHTML = html;

}   // phoneCheck() end
