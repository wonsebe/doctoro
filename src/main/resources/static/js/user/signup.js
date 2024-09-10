console.log('signup.js');

let signupCheck = [false, false, false, false, false];

// 1. 회원가입 함수
function doSignup() {   console.log('signup()');
    for (let i = 0; i < signupCheck.length; i++) {
        if (!signupCheck[i]) {
            alert('유효하지 않은 정보가 있습니다.');
            return;
        }
    }

    // 1. 입력값 가져오기
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;
    let name = document.querySelector('#name').value;
    let gender;
    let phone = document.querySelector('#phone').value;
    
    // 라디오 버튼 선택한 값 가져오기
    genderValue = document.getElementsByName("gender");
    genderValue.forEach((radio) => {
        if (radio.checked) {
            gender = radio.defaultValue;
        }
    });

    // 2. 객체
    let data = {
        id : id,
        password : pw,
        name : name,
        gender : gender,
        phone : phone
    }
    console.log(data);

    // 3. ajax
    $.ajax({
        async : false,
        method : 'post',
        url : '/user/signup',
        data : data,
        success : (result) => {     console.log(result);
            if (result) {
                alert('회원가입 성공');
                location.href = '/';
            } else {
                console.log('회원가입 실패');

            }
        }   // success end
    })  // ajax end

}   // doSignup() end

// 2. 아이디 유효성 검사
function idCheck() {    console.log('idCheck()');
    // 1. 입력된 값 가져오기
    let id = document.querySelector('#id').value;
    let idInputCheck = document.querySelector('#idInputCheck');

    // 2. 정규표현식 : 영대소문자와 숫자 조합의 8~20글자까지 허용
    let idRegex = /^[a-zA-Z0-9]{8,20}$/;
    
    // 3. 정규표현식 검사
    console.log(idRegex.test(id));

    let html = '';

    // 4. 정규표현식을 만족하면 if문 실행
    if (idRegex.test(id)) {
        console.log(id);
        $.ajax({
            async : false,
            method : 'get',
            url : '/user/idcheck',
            data : id,  
            success : (result) => { console.log(result);
                if (result) {
                    html = '사용 가능한 아이디입니다.'
                    signupCheck[0] = true;
                } else {
                    html = '이미 사용중인 아이디입니다.';
                    signupCheck[0] = false;
                }
            }   // success end
        });  // ajax end
    } else {    // 정규표현식을 만족하지 않으면 else문 실행
        html = '영대소문자와 숫자 조합, 길이는 8~20글자까지 가능합니다.';
        signupCheck[0] = false;
    }
    idInputCheck.innerHTML = html;
    
}   // idCheck() end

// 3. 비밀번호 유효성 검사
function pwCheck() {
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
        signupCheck[1] = true;
    } else {
        html = '영대소문자, 숫자, 특수문자 조합, 길이는 8~20글자까지 가능합니다.';
        signupCheck[1] = false;
    }
    pwInputCheck.innerHTML = html;

}

