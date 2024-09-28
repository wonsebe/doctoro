console.log('myinfo.js');

// 1. 내 정보 호출
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

// ======================== 내 포켓몬 ======================== //
// 내 포켓몬 존재 유무
myPokeExistCheck();
function myPokeExistCheck() {   console.log('myPokeExistCheck()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/mypoke/exist',
        success : (result) => {     console.log(result);
            if (result == '') {     // 내 포켓몬이 존재하지 않으면
                console.log('처음 생성');

                let myPokeStatus = document.querySelector('#myPokeStatus');

                let html = `
                            <button type="button" onclick="MyPokeAdd()">포켓몬 생성</button>
                            `

                myPokeStatus.innerHTML = html;
            } else {
                console.log('이미 생성');
                let myPokeStatus = document.querySelector('#myPokeStatus');

                let html = `
                            <h4>${result.stage}단계</h4>
                            <img id="imgEgg" src="/img/알.png" />
                            <h4>이름 : 알</h4>
                            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar" style="width: 25%">25%</div>
                            </div>
                            <button type="button" >진화하기</button>
                            <button type="button" >리셋하기</button>
                            `

                myPokeStatus.innerHTML = html;
            }

        }   // success end
    })  // ajax end
}   // myPokeExistCheck() end

// 내 포켓몬 생성
function MyPokeAdd() {      console.log('MyPokeAdd()');
    $.ajax({
        async : false,
        method : 'post',
        url : '/mypoke/add',
        success : (result) => {     console.log(result);
            if (result) {
                alert('포켓몬 생성 완료');
                myPokeExistCheck();
            } else {
                alert('포켓몬 생성 실패');
                myPokeExistCheck();
            }            
        }   // success end
    })  // ajax end
}   // MyPokeAdd() end




