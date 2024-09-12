console.log('delete.js');

// 1. 회원 탈퇴 함수
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

