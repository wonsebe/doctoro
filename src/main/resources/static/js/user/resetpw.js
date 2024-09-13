console.log('resetpw.js');

let doCheck = [false, false];

// 1. 비밀번호 재설정 함수
function doResetPw() {   console.log('doResetPw()');
    for (let i = 0; i < doCheck.length; i++) {
        if (!doCheck[i]) {
            alert('유효하지 않은 정보가 있습니다.');
            return;
        }
    }

    let uno = Number(sessionStorage.getItem("uno"));
    console.log(uno);

    // 입력값 가져오기
    let pw = document.querySelector('#pw').value;

    // ajax
    $.ajax({
        async : false,
        method : 'put',
        url : '/user/reset/pw',
        data : { 
            uno : uno,
            password : pw
        },
        success : (result) => {     console.log(result);
            if (result) {
                alert('비밀번호 재설정 성공');
                location.href = '/user/login';
            } else {
                alert('비밀번호 재설정 실패');
            }
        }   // success end
    })  // ajax end

}   // doResetPw() end

// 2. 비밀번호 유효성 검사
function pwCheck() {    console.log('pwCheck()');
    // 1. 입력된 값 가져오기
    let pw = document.querySelector('#pw').value;
    let pwInputCheck = document.querySelector('#pwInputCheck');
    
    // 2. 정규표현식 : 영대소문자, 숫자, 특수문자 조합의 8~20글자까지 허용
    let pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    
    // 3. 정규표현식 검사
    console.log(pwRegex.test(pw));

    let html = '';

    // 4. 정규표현식을 만족하면 if문 실행
    if (pwRegex.test(pw)) {
        html = '사용가능한 비밀번호입니다.'
        doCheck[0] = true;
    } else {
        html = '8~20글자의 영문 대/소문자, 숫자, 특수문자만 사용 가능합니다.';
        doCheck[0] = false;
    }
    pwInputCheck.innerHTML = html;

    pwConfirmCheck();
}

// 3. 비밀번호 확인 검사
function pwConfirmCheck() { console.log('pwConfirmCheck()');
    // 1. 입력된 값 가져오기
    let pw = document.querySelector('#pw').value;
    let pwConfirm = document.querySelector('#pwConfirm').value;
    let pwConfirmInputCheck = document.querySelector('#pwConfirmInputCheck');

    let html = '';

    // 2. 비밀번호와 비밀번호 확인 값의 일치여부에 따른 처리
    if (pw == pwConfirm) {
        html = '비밀번호가 일치합니다.'
        doCheck[1] = true;
    } else {
        html = '비밀번호가 일치하지 않습니다.'
        doCheck[1] = false;
    }

    pwConfirmInputCheck.innerHTML = html;
}   // pwConfirmCheck() end