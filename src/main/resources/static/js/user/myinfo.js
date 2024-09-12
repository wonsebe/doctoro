console.log('myinfo.js');

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
                let myinfo = document.querySelector('#myinfo');
                let html = ``;

                html += `
                        <div>아이디 : ${result.id}</div>
                        <div>이름 : ${result.name}</div>
                        <div>성별 : ${result.gender}</div>
                        <div>전화번호 : ${result.phone}</div>
                        <div>생년월일 : ${result.ubirth}</div>
                        `;

                myinfo.innerHTML = html;
            }
        }   // success end
    })  // ajax end
}   // doMyInfo() end


