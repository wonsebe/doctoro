console.log('myinfo.js');

// 1. 내정보 호출
doMyInfo();
function doMyInfo() {
    console.log('doMyInfo()');
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/my/info',
        success: (result) => {
            console.log(result);
            if (result == '') {
                alert("로그인 후 이용 가능합니다.");
                location.href = "/user/login";
            } else if (result.id == "admin") {
                let myinfo = document.querySelector('#myinfo');
                let html = ``;

                html += `
                        <div>아이디 : ${result.id}</div>
                        <div>이름 : ${result.name}</div>
                        <div>성별 : ${result.gender}</div>
                        <div>전화번호 : ${result.phone}</div>
                        <div>생년월일 : ${result.ubirth}</div>
                        <button type="button" onclick="poke_rate_model_update()"> 승률 예측 모델 최신화 </button>
                        `;

                myinfo.innerHTML = html;
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


function poke_rate_model_update() {
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate_pred/update",
        success: function response(result) {
            console.log(result);
            alert(result);
        }
    })
}