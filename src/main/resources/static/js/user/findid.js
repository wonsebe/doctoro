console.log('findid.js');

// 1. 아이디 찾기 함수
function doFindId() {   console.log('doFindId()');
    // 입력된 값 가져오기
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;
    let birth = document.querySelector('#birth').value;

    // 객체화
    let data = {
        name : name,
        phone : phone,
        ubirth : birth
    }
    console.log(data);

    // ajax
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/find/id',
        data : data,
        success : (result) => {     console.log(result);
            let html = ``;
            if (result == '') {
                alert('일치하는 정보가 없습니다. 다시 시도해주세요.');
                html += ``;
            } else {    // 아이디를 찾은 경우
                let findidBox = document.querySelector('#findidBox');

                html += `
                        회원님의 아이디는 ${result}입니다.
                        `;

                findidBox.innerHTML = html;
            }
        }   // success end
    })  // ajax end
}   // doFindId() end
