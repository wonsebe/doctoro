console.log('login.js');

// 로그인 함수
function doLogin() {    console.log('doLogin()');
    // 1. 입력한 값 가져오기
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;

    // 2. 객체화
    data = {
        id : id,
        password : pw
    }
    console.log(data);

    // 3. ajax
    $.ajax({
        async : false,
        method : 'post',
        url : '/user/login',
        data : data,  
        success : (result) => {     console.log(result);
            if (result) {
                alert('로그인 성공');
                location.href = "/";
            } else {
                alert('로그인 실패');
            }

        }   // success end

    })  // ajax end

}   // doLogin() end

