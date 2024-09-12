console.log('update.js')

// 1. 내정보 호출
doMyInfo();
function doMyInfo() {   console.log('doMyInfo()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/my/info',
        success : (result) => {     console.log(result);
            if (result == '') {
                alert("로그인 후 이용 가능합니다.");
                location.href="/user/login";
            } else {
                // input에 회원 정보 넣어주기
                document.querySelector('#id').value = result.id;
                document.querySelector('#name').value = result.name;
                document.querySelector('#phone').value = result.phone;
                document.querySelector('#birth').value = result.ubirth;

                // 라디오 버튼에서 회원 성별 보여주기
                let gender = document.getElementsByName("gender");
                gender.forEach((radio) => {
                    if (radio.value == result.gender) {
                        radio.checked = true;
                    }
                });
            }
        }   // success end
    })  // ajax end
}   // doMyInfo() end

// 2. 회원 정보 수정 함수
function doUpdate() {   console.log('doUpdate()');
    // id는 값을 가져오니까 doCheck[0] false여도 넘어갈 수 있도록 1부터 시작
    for (let i = 1; i < doCheck.length; i++) {
        if (!doCheck[i]) {
            alert('유효하지 않은 정보가 있습니다.');
            return;
        }
    }

    // 입력값 가져오기
    let pw = document.querySelector('#pw').value;
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;

    // 객체화
    let data = {
        password : pw,
        name : name,
        phone : phone
    }
    console.log(data);

    // ajax
    $.ajax({
        async : false,
        method : 'put',
        url : '/user/update',
        data : data,
        success : (result) => {     console.log(result);
            if (result) {
                alert('회원 정보 수정 성공');
                location.href = '/user/myinfo';
            } else {
                alert('회원 정보 수정 실패');
            }
        }   // success end
    })  // ajax end
}   // doUpdate() end

