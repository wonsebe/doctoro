console.log('signup.js');

let doCheck = [false, false, false, false, false, false];

// 1. 회원가입 함수
function doSignup() {   console.log('doSignup()');
    for (let i = 0; i < doCheck.length; i++) {
        if (!doCheck[i]) {
            alert('유효하지 않은 정보가 있습니다.');
            return;
        }
    }

    // 입력값 가져오기
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;
    let name = document.querySelector('#name').value;
    let gender;
    let phone = document.querySelector('#phone').value;
    let birth = document.querySelector('#birth').value;

    // 주소 값 가져오기
    let sample6_address =document.querySelector('#sample6_address').value;
    let sample6_detailAddress= document.querySelector('#sample6_detailAddress').value;
    let address = sample6_address + " " + sample6_detailAddress
    console.log(address);
    
    // 라디오 버튼 선택한 값 가져오기
    let genderValue = document.getElementsByName("gender");
    genderValue.forEach((radio) => {
        if (radio.checked) {
            gender = radio.defaultValue;
        }
    });

    // 객체
    let data = {
        id : id,
        password : pw,
        name : name,
        gender : gender,
        phone : phone,
        ubirth : birth,
        address : address
    }
    console.log(data);

    // ajax
    $.ajax({
        async : false,
        method : 'post',
        url : '/user/signup',
        data : data,
        success : (result) => {     console.log(result);
            if (result) {
                alert('회원가입 성공');
                location.href = '/user/login';
            } else {
                alert('회원가입 실패');
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
            url : '/user/check/id',
            data : { id : id },  
            success : (result) => { console.log(result);
                if (result) {
                    html = '사용 가능한 아이디입니다.'
                    doCheck[0] = true;
                } else {
                    html = '이미 사용중인 아이디입니다.';
                    doCheck[0] = false;
                }
            }   // success end
        });  // ajax end
    } else {    // 정규표현식을 만족하지 않으면 else문 실행
        html = '8~20글자의 영문 대/소문자와 숫자만 사용 가능합니다.';
        doCheck[0] = false;
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
        html = '사용 가능한 비밀번호입니다.'
        doCheck[1] = true;
    } else {
        html = '8~20글자의 영문 대/소문자, 숫자, 특수문자만 사용 가능합니다.';
        doCheck[1] = false;
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
        doCheck[2] = true;
    } else {
        html = '비밀번호가 일치하지 않습니다.'
        doCheck[2] = false;
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
        doCheck[3] = true;
    } else {
        html = '2~15글자의 한글 또는 영문 대/소문자만 사용 가능합니다.';
        doCheck[3] = false;
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
        console.log(phone);
        $.ajax({
            async : false,
            method : 'get',
            url : '/user/check/phone',
            data : { phone : phone },  
            success : (result) => { console.log(result);
                if (result) {
                    html = '사용 가능한 전화번호입니다.'
                    doCheck[4] = true;
                } else {
                    html = '이미 사용중인 전화번호입니다.';
                    doCheck[4] = false;
                }
            }   // success end
        });  // ajax end
    } else {    // 정규표현식을 만족하지 않으면 else문 실행
        html = '00-0000-0000 또는 000-0000-0000 형식으로 입력해주세요.';
        doCheck[4] = false;
    }
    phoneInputCheck.innerHTML = html;

}   // phoneCheck() end

birthCheck();
// 7. 생년월일 유효성 검사
function birthCheck() {    console.log('birthCheck()');
    // 1. 생년월일 입력 시 오늘 날짜 이후로는 입력하지 못하도록 막기
    var nowDate = Date.now();
    // getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
    var timeOff = new Date().getTimezoneOffset() * 60000;
    var today = new Date(nowDate-timeOff).toISOString().split("T")[0];
    document.getElementById("birth").setAttribute("max", today);

    // 2. 생년월일 입력 여부 체크
    let birth = document.querySelector('#birth').value;
    console.log(birth);
    let birthInputCheck = document.querySelector('#birthInputCheck');

    if (birth == '') {
        html = '생년월일을 입력해주세요.';
        doCheck[5] = false;
    } else {
        html = ''
        doCheck[5] = true;
    }
    birthInputCheck.innerHTML = html;

}   // birthCheck() end

// 다음 지도 함수
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}