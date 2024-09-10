console.log('signup.js');

let signupCheck = [false, false, false, false, false];

// 1. 회원가입 함수
function doSignup() {   console.log('doSignup()');
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
            data : { id : id },  
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
        html = '8~20글자의 영문 대/소문자와 숫자만 사용 가능합니다.';
        signupCheck[0] = false;
    }
    idInputCheck.innerHTML = html;
    
}   // idCheck() end

// 3. 비밀번호 유효성 검사
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
        signupCheck[1] = true;
    } else {
        html = '8~20글자의 영문 대/소문자, 숫자, 특수문자만 사용 가능합니다.';
        signupCheck[1] = false;
    }
    pwInputCheck.innerHTML = html;

    pwConfirmCheck();
}

// 4. 비밀번호 확인 검사
function pwConfirmCheck() { console.log('pwConfirmCheck()');
    // 1. 입력된 값 가져오기
    let pw = document.querySelector('#pw').value;
    let pwConfirm = document.querySelector('#pwConfirm').value;
    let pwConfirmInputCheck = document.querySelector('#pwConfirmInputCheck');

    let html = '';

    // 2. 비밀번호와 비밀번호 확인 값의 일치여부에 따른 처리
    if (pw == pwConfirm) {
        html = '비밀번호가 일치합니다.'
        signupCheck[2] = true;
    } else {
        html = '비밀번호가 일치하지 않습니다.'
        signupCheck[2] = false;
    }

    pwConfirmInputCheck.innerHTML = html;
}   // pwConfirmCheck() end

// 5. 이름 유효성 검사
function nameCheck() {  console.log('nameCheck()');
    // 1. 입력된 값 가져오기
    let name = document.querySelector('#name').value;
    let nameInputCheck = document.querySelector('#nameInputCheck');

    // 2. 정규표현식 : 영문 대/소문자, 한글 조합의 2~15글자 허용
    let nameRegex = /^[가-힣a-zA-Z]{2,15}$/;

    // 3. 정규표현식 검사
    console.log(nameRegex.test(name));

    // 4. 정규표현식을 만족하면 if문 실행
    if (nameRegex.test(name)) {
        html = '사용가능한 이름입니다.'
        signupCheck[3] = true;
    } else {
        html = '2~15글자의 한글 또는 영문 대/소문자만 사용 가능합니다.';
        signupCheck[3] = false;
    }
    nameInputCheck.innerHTML = html;

}   // nameCheck() end

// 6. 전화번호 유효성 검사
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

    // 4. 정규표현식을 만족하면 if문 실행
    if (phoneRegex.test(phone)) {
        html = '사용가능한 전화번호입니다.'
        signupCheck[4] = true;
    } else {
        html = '00-0000-0000 또는 000-0000-0000 형식으로 입력해주세요.';
        signupCheck[4] = false;
    }
    phoneInputCheck.innerHTML = html;

}   // phoneCheck() end


