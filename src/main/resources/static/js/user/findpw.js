console.log('findpw.js');

// 1. 비밀번호 찾기 함수
function doFindPw() {   console.log('doFindPw()');
    // 입력된 값 가져오기
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;
    let birth = document.querySelector('#birth').value;

    // 객체화
    let data = {
        id : id,
        name : name,
        phone : phone,
        ubirth : birth
    }
    console.log(data);

    // ajax
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/find/pw',
        data : data,
        success : (result) => {     console.log(result);
            let html = ``;
            if (result) {   // 비밀번호를 찾은 경우
                sessionStorage.setItem("uno", result.uno);
                location.href="/user/reset/pw";
            } else {
                alert('일치하는 정보가 없습니다. 다시 시도해주세요.');
                html += ``;
            }
        }   // success end
    })  // ajax end
}   // doFindId() end

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



