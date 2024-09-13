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
            if (result == '') {
                alert('일치하는 정보가 없습니다. 다시 시도해주세요.');
                html += ``;
            } else {    // 비밀번호를 찾은 경우
                location.href="/user/reset/pw";
            }
        }   // success end
    })  // ajax end
}   // doFindId() end



