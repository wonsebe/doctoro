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
                        <button type="button" onclick="poke_vote_list_update()"> 마을 투표 기록 최신화 </button>
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

function poke_vote_list_update() {
    $.ajax({
        async: false,
        method: "get",
        url: "/vote/record/read_first",
        success: function response(result) {
            console.log(result);
        }
    })
}


// ======================== 내 포켓몬 ======================== //
let myExp = 0;          // 나의 경험치량
let maxExp = 0;         // 최대 경험치량
let stage = 0;          // 내 포켓몬 현재 단계
let evolve = false;     // 진화 가능 여부
let uno = 0;            // 유저 번호
let expLogDto = [];     // 내 포켓몬 경험치 기록 // ajax로부터 응답받은 객체를 저장하는 변수 

// 내 포켓몬 존재 유무에 따른 포켓몬 출력
myPokeExistCheck();
function myPokeExistCheck() {
    console.log('myPokeExistCheck()');
    $.ajax({
        async: false,
        method: 'get',
        url: '/mypoke/exist',
        success: (result) => {
            console.log(result);
            uno = result.uno;       // 현재 로그인된 유저 번호 대입

            expLogPrint();          // 내 포켓몬 경험치 기록 최근 10개 가져오기

            if (result == '') {     // 내 포켓몬이 존재하지 않으면
                console.log('처음 생성');

                let myPokeStatus = document.querySelector('#myPokeStatus');

                let html = `
                            <button type="button" class="myPokeAdd" onclick="MyPokeAdd()">포켓몬 생성</button>
                            `

                myPokeStatus.innerHTML = html;
            } else {
                console.log('이미 생성');

                stage = result.stage;

                expTotal();         // 총 경험치 값 가져오기

                let myPokeStatus = document.querySelector('#myPokeStatus');

                let html = ``;

                // (현재 경험치 / 전체 경험치) * 100 으로 나온 값을 경험치바에 비율 계산해서 표시
                // 4% 미만일 경우 경험치바 내의 글씨가 보이지 않는 경우가 있어 최소가 4%도록 설정
                let expPercent = (myExp / maxExp) * 100;
                if (expPercent == 0) {
                    expPercent = 0;
                } else if (expPercent < 4) {
                    expPercent = 4;
                }

                if (result.stage == 0) {    // 0단계 출력
                    html += `
                            <h4>${result.stage}단계</h4>
                            <img id="myPokeImg" src="/img/알.png" />
                            <h4 class="pokeName">이름 : 알</h4>
                            <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${myExp}" aria-valuemin="0" aria-valuemax="${maxExp}">
                                <div class="progress-bar" style="width: ${expPercent}%">${myExp} / ${maxExp}</div>
                            </div>
                            `
                    if (evolve) {   // 진화가 가능한 경우
                        html += `
                                <button type="button" class="evolveBtn" onclick="doEvolve(${result.stage})">진화하기</button>
                                <button type="button" class="resetBtn" onclick="reset()">리셋하기</button>
                                `
                    } else {        // 진화가 불가능한 경우
                        html += `
                                <button type="button" class="evolveBtn" disabled>진화하기</button>
                                <button type="button" class="resetBtn" onclick="reset()">리셋하기</button>
                                `
                    }
                } else {    // 1 ~ 6단계 출력
                    // 파이썬에 내 포켓몬 번호를 넘겨주어 포켓몬 이름, 이미지 가져오기
                    $.ajax({
                        async: false,
                        method: 'get',
                        url: 'http://localhost:5000/mypoke/info',
                        data: { pokeno: result.pokeno },
                        success: (res) => {
                            console.log(res);
                            html += `
                                    <h4>${result.stage}단계</h4>
                                    <img id="myPokeImg" src="${res[0].이미지}" />
                                    <h4 class="pokeName">이름 : ${res[0].한글이름}</h4>
                                    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${myExp}" aria-valuemin="0" aria-valuemax="${maxExp}">
                                        <div class="progress-bar" style="width: ${expPercent}%">${myExp} / ${maxExp}</div>
                                    </div>
                                    `
                            if (evolve) {   // 진화가 가능한 경우
                                html += `
                                        <button type="button" class="evolveBtn" onclick="doEvolve(${result.stage})">진화하기</button>
                                        <button type="button" class="resetBtn" onclick="reset()">리셋하기</button>
                                        `
                            } else {        // 진화가 불가능한 경우
                                html += `
                                        <button type="button" class="evolveBtn" disabled>진화하기</button>
                                        <button type="button" class="resetBtn" onclick="reset()">리셋하기</button>
                                        `
                            }

                        }   // success end
                    })  // ajax end
                }

                myPokeStatus.innerHTML = html;
            }

        }   // success end
    })  // ajax end
}   // myPokeExistCheck() end

// 내 포켓몬 생성
function MyPokeAdd() {
    console.log('MyPokeAdd()');
    $.ajax({
        async: false,
        method: 'post',
        url: '/mypoke/add',
        success: (result) => {
            console.log(result);
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

// 내 포켓몬 초기화
function reset() {
    console.log('reset()');
    if (confirm("정말 리셋 하시겠습니까?")) {
        $.ajax({
            async: false,
            method: 'delete',
            url: '/mypoke/reset',
            success: (result) => {
                console.log(result);
                if (result) {
                    alert('초기화가 완료되었습니다.');
                    expLogPrint();          // 내 포켓몬 경험치 기록 최근 10개 가져오기
                    myPokeExistCheck();
                } else {
                    alert('초기화 하는 데에 실패하였습니다. 다시 시도해주세요.');
                }
            }   // success end
        })  // ajax end
    }
}   // reset() end

// 총 경험치 값 가져오기
function expTotal() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/exp/total',
        data: { loginUno: uno },
        success: (result) => {
            console.log(result);
            // 총 경험치 값과 단계에 따른 현재 경험치, 최대 경험치 값 계산, 진화 가능 여부 판별
            if (result >= 2100) {           // 총 경험치 값이 2100 이상이고
                console.log(stage);

                if (stage == 5) {               // 단계가 5단계면 -> 600 / 600, 진화 가능
                    myExp = 600;
                    maxExp = 600;
                    evolve = true;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                } else {
                    evolve = false;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                }
            } else if (result >= 1500) {    // 총 경험치 값이 1500 이상이고
                console.log(stage);

                if (stage == 5) {               // 단계가 5단계면 -> 최대값이하 / 600, 진화 불가
                    myExp = result - 1500;
                    maxExp = 600;
                    evolve = false;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                } else if (stage <= 4) {        // 단계가 4단계 이하면 -> 500 / 500, 진화 가능
                    myExp = 500;
                    maxExp = 500;
                    evolve = true;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                }
            } else if (result >= 1000) {    // 총 경험치 값이 1000 이상이고
                console.log(stage);

                if (stage == 4) {               // 단계가 4단계면 -> 최대값이하 / 500, 진화 불가
                    myExp = result - 1000;
                    maxExp = 500;
                    evolve = false;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                } else if (stage <= 3) {        // 단계가 3단계 이하면 -> 400 / 400, 진화 가능
                    myExp = 400;
                    maxExp = 400;
                    evolve = true;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                }
            } else if (result >= 600) {     // 총 경험치 값이 600 이상이고
                console.log(stage);

                if (stage == 3) {               // 단계가 3단계면 -> 최대값이하 / 400, 진화 불가
                    myExp = result - 600;
                    maxExp = 400;
                    evolve = false;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                } else if (stage <= 2) {        // 단계가 2단계 이하면 -> 300 / 300, 진화 가능
                    myExp = 300;
                    maxExp = 300;
                    evolve = true;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                }
            } else if (result >= 300) {     // 총 경험치 값이 300 이상이고
                console.log(stage);

                if (stage == 2) {               // 단계가 2단계면 -> 최대값이하 / 300, 진화 불가
                    myExp = result - 300;
                    maxExp = 300;
                    evolve = false;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                } else if (stage <= 1) {        // 단계가 1단계 이하면 -> 200 / 200, 진화 가능
                    myExp = 200;
                    maxExp = 200;
                    evolve = true;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                }
            } else if (result >= 100) {     // 총 경험치 값이 100 이상이고
                console.log(stage);

                if (stage == 1) {               // 단계가 1단계면 -> 최대값이하 / 200, 진화 불가
                    myExp = result - 100;
                    maxExp = 200;
                    evolve = false;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                } else if (stage <= 0) {        // 단계가 0단계 이하면 -> 100 / 100, 진화 가능
                    myExp = 100;
                    maxExp = 100;
                    evolve = true;

                    console.log(myExp);
                    console.log(maxExp);
                    console.log(evolve);
                }
            } else {                        // 총 경험치 값이 100 미만이면
                console.log(stage);

                myExp = result;                 // 최대값이하 / 100, 진화 불가
                maxExp = 100;
                evolve = false;

                console.log(myExp);
                console.log(maxExp);
                console.log(evolve);
            }

            console.log(myExp);
            console.log(maxExp);
            console.log(evolve);

        }   // success end
    })  // ajax end
}   // expTotal() end

// 진화하기
function doEvolve(myStage) {
    console.log('doEvolve()');
    $.ajax({
        async: false,
        method: 'get',
        url: 'http://localhost:5000/mypoke/evolve',
        data: { stage: myStage + 1 },
        success: (result) => {
            console.log(result);
            if (result != '') {     // 파이썬에서 진화할 새로운 포켓몬 번호를 받아왔다면
                $.ajax({
                    async: false,
                    method: 'put',
                    url: '/mypoke/evolve/new',
                    data: { pokeno: result.new_pokeno, stage: myStage + 1 },
                    success: (res) => {
                        console.log(res);
                        if (res) {
                            alert('포켓몬이 진화했습니다!');
                            stage = myStage + 1;
                            myPokeExistCheck();
                        } else {
                            alert('진화에 실패하였습니다. 다시 시도해주세요.');
                        }
                    }   // success2 end
                })  // ajax2 end

            }   // if end
        }   // success end
    })  // ajax end
}   // doEvolve() end

// 내 포켓몬 경험치 기록 최근 10개 가져오기
function expLogPrint() {
    console.log('expLogPrint()');
    $.ajax({
        async: false,
        method: 'get',
        url: '/exp/log',
        data: { loginUno: uno },
        success: (result) => {
            console.log(result);
            expLogDto = result;     // 응답 데이터의 타입이 Array , Object인지 확인 필요함.

        }   // success end
    })  // ajax end

    let expLogAreaTbody = document.querySelector('#expLogAreaTbody');
    let expLogArea = document.querySelector('#expLogArea');

    let html = ``;

    console.log(expLogDto.length);  // 내 포켓몬 경험치 기록 개수

    if (expLogDto != '') {  // 내 포켓몬 경험치 기록이 있는 경우
        for (let i = 0; i < expLogDto.length; i++) {
            html += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${expLogDto[i].expmethod}</td>
                        <td>${expLogDto[i].expvalue}</td>
                        <td>${expLogDto[i].expdate}</td>
                    </tr>
                    `;
        }   // for end

        expLogAreaTbody.innerHTML = html;
    } else {    // 내 포켓몬 경험치 기록이 없는 경우
        html += `
                <thead>
                </thead>
                <tbody id="expLogAreaTbody">
                    <tr> <td>경험치 기록이 존재하지 않습니다.</td> </tr>
                </tbody>
                `;

        expLogArea.innerHTML = html;
    }

}   // expLogPrint() end


// ======================== 포인트 ======================== //
// 나의 현재 무료 포인트 값 가져오기
currentFreePoint();
function currentFreePoint() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/point/free',
        success: (result) => {
            console.log(result.totalPoint);
            let myCurrentFreePoint = document.querySelector('.myCurrentFreePoint');
            let html = ``;

            if (result == '') {     // 포인트가 존재하지 않으면
                html += `
                        0 포인트
                        `;
            } else {
                html += `
                        ${result.totalPoint} 포인트
                        `;
            }

            myCurrentFreePoint.innerHTML = html;
        }   // success end
    })  // ajax end
}   // currentFreePoint() end

// 나의 무료 포인트 로그 가져오기
freePointLog();
function freePointLog() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/point/free/log',
        success: (result) => {
            console.log(result);
            freePointLogDto = result;

        }   // success end
    })  // ajax end

    let myFreePointLogTbody = document.querySelector('.myFreePointLogTbody');
    let myFreePointLog = document.querySelector('.myFreePointLog');

    let html = ``;

    if (freePointLogDto != '') {  // 내 무료 포인트 기록이 있는 경우
        for (let i = 0; i < freePointLogDto.length; i++) {
            html += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${freePointLogDto[i].point_reason}</td>
                        <td>${freePointLogDto[i].point_indecrease}</td>
                        <td>${freePointLogDto[i].point_date}</td>
                    </tr>
                    `;
        }   // for end

        myFreePointLogTbody.innerHTML = html;
    } else {    // 내 무료 포인트 기록이 없는 경우
        html += `
                <thead>
                </thead>
                <tbody id="myFreePointLogTbody">
                    <tr> <td>무료 포인트 기록이 존재하지 않습니다.</td> </tr>
                </tbody>
                `;

        myFreePointLog.innerHTML = html;
    }

}   // freePointLog() end

// 나의 현재 유료 포인트 값 가져오기
currentPaidPoint();
function currentPaidPoint() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/point/paid',
        success: (result) => {
            console.log(result.totalPoint);
            let myCurrentPaidPoint = document.querySelector('.myCurrentPaidPoint');
            let html = ``;

            if (result == '') {     // 포인트가 존재하지 않으면
                html += `
                        0 포인트
                        `;
            } else {
                html += `
                        ${result.totalPoint} 포인트
                        `;
            }

            myCurrentPaidPoint.innerHTML = html;
        }   // success end
    })  // ajax end
}   // currentPaidPoint() end

// 나의 유료 포인트 로그 가져오기
paidPointLog();
function paidPointLog() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/point/paid/log',
        success: (result) => {
            console.log(result);
            paidPointLogDto = result;

        }   // success end
    })  // ajax end

    let myPaidPointLogTbody = document.querySelector('.myPaidPointLogTbody');
    let myPaidPointLog = document.querySelector('.myPaidPointLog');

    let html = ``;

    if (paidPointLogDto != '') {  // 내 유료 포인트 기록이 있는 경우
        for (let i = 0; i < paidPointLogDto.length; i++) {
            html += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${paidPointLogDto[i].point_reason}</td>
                        <td>${paidPointLogDto[i].point_indecrease}</td>
                        <td>${paidPointLogDto[i].point_date}</td>
                    </tr>
                    `;
        }   // for end

        myPaidPointLogTbody.innerHTML = html;
    } else {    // 내 무료 포인트 기록이 없는 경우
        html += `
                <thead>
                </thead>
                <tbody id="myPaidPointLogTbody">
                    <tr> <td>유료 포인트 기록이 존재하지 않습니다.</td> </tr>
                </tbody>
                `;

        myPaidPointLog.innerHTML = html;
    }

}   // paidPointLog() end

