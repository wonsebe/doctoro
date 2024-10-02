console.log("rate.js");



let poke_stat1 = {}
let poke_stat2 = {}




function poke_select1() {
    let select = document.querySelector("#poke_select1")
    let html = ``;
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/all_info",
        success: function response(result) {
            console.log(result);
            result.forEach((r, index) => {  // index: 0, 1, 2...
                html += `<option value=${index}>${r["한글이름"]} ${r["영어이름"]}</option>
                        `;
            })
            select.innerHTML = html;
        }

    })
}


function poke_read1() {
    let poke_info = document.querySelector("#poke1");
    let n = document.querySelector("#poke_select1").value;
    let html = ``;
    let kr_type = "";
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/data_info",
        data: { n: n },
        success: function response(result) {
            console.log(result)
            poke_stat1 = {
                "HP": result.체력,
                "ATK": result.공격,
                "DEF": result.방어,
                "SPD": result.스피드,
                "SP_ATK": result.특수공격,
                "SP_DEF": result.특수방어
            }

            kr_type = type_trans(result.타입)
            html += `<tr>
                        <td>
                        </td>
                        <td>
                            <div class="cards">
                                <figure class="card">
                                    <img src="${result.이미지}" />
                                    <figcaption>${result.한글이름} <br>${result.영어이름} </figcaption>
                                </figure>
                            </div>
                        <td>
                    </tr>
                    <tr>
                        <td>
                            체력
                        </td>
                        <td>
                            ${result.체력}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            공격
                        </td>
                        <td>
                            ${result.공격}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            방어
                        </td>
                        <td>
                            ${result.방어}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            스피드
                        </td>
                        <td>
                            ${result.스피드}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            특수공격
                        </td>
                        <td>
                            ${result.특수공격}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            특수방어
                        </td>
                        <td>
                            ${result.특수방어}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            타입
                        </td>
                        <td>
                            ${kr_type} ${result.타입}
                        </td>
                    </tr>
                    `;
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/rate/each_skill_info",
                data: { kr_name: result.한글이름 },
                success: function response(result) {
                    console.log(result);
                    html += `<tr>
                                <td>
                                    기술 선택
                                </td>
                                <td>
                                    <select name="" id="poke_select_skill1">`
                    result.forEach(r => {
                        html += `
                                        <option value=${r.위력}>${r.기술이름} (${r.타입})</option>
                                        `;
                    })
                    html += `
                                    </select>
                                </td>
                            </tr>`;

                }
            })
            poke_info.innerHTML = html;
        }

    })
}


function poke_select2() {
    let select = document.querySelector("#poke_select2")
    let html = ``;
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/all_info",
        success: function response(result) {
            console.log(result);
            result.forEach((r, index) => {  // index: 0, 1, 2...
                html += `<option value=${index}>${r["한글이름"]} ${r["영어이름"]}</option>
                        `;
            })
            select.innerHTML = html;
        }

    })
}


function poke_read2() {
    let poke_info = document.querySelector("#poke2");
    let n = document.querySelector("#poke_select2").value;
    let html = ``;
    let kr_type = "";
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/data_info",
        data: { n: n },
        success: function response(result) {
            console.log(result)
            kr_type = type_trans(result.타입)
            poke_stat2 = {
                "HP": result.체력,
                "ATK": result.공격,
                "DEF": result.방어,
                "SPD": result.스피드,
                "SP_ATK": result.특수공격,
                "SP_DEF": result.특수방어
            }
            html += `<tr>
                        <td>
                            <div class="cards">
                                <figure class="card">
                                    <img src="${result.이미지}" />
                                    <figcaption>${result.한글이름} <br>${result.영어이름} </figcaption>
                                </figure>
                            </div>
                        <td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${result.체력}
                        </td>
                        <td>
                            체력
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${result.공격}
                        </td>
                        <td>
                            공격
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${result.방어}
                        </td>
                        <td>
                            방어
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${result.스피드}
                        </td>
                        <td>
                            스피드
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${result.특수공격}
                        </td>
                        <td>
                            특수공격
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${result.특수방어}
                        </td>
                        <td>
                            특수방어
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ${kr_type} ${result.타입}
                        </td>
                        <td>
                            타입
                        </td>
                    </tr>
                    `;
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/rate/each_skill_info",
                data: { kr_name: result.한글이름 },
                success: function response(result) {
                    console.log(result);
                    html += `<tr>
                                        <td>
                                            <select name="" id="poke_select_skill2">`
                    result.forEach(r => {
                        html += `
                                                <option value=${r.위력}>${r.기술이름} (${r.타입})</option>
                                                `;
                    })
                    html += `
                                            </select>
                                        </td>
                                        <td>
                                            기술 선택
                                        </td>
                                    </tr>`;

                }
            })
            poke_info.innerHTML = html;
        }

    })
}

function rate_cal() {
    let n1 = document.querySelector("#poke_select1").value;
    let n2 = document.querySelector("#poke_select2").value;
    let m1 = document.querySelector("#poke_select_skill1").value;
    let m2 = document.querySelector("#poke_select_skill2").value;
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/cal",
        data: { n1: n1, n2: n2, m1: m1, m2: m2 },
        success: function response(result) {
            console.log(result)
            let cal_content = document.querySelector(".modal-body");
            let html = ``;
            html += `<table class = "rate_modal">
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th>
                                    1번 포켓몬
                                </th>
                                <th>
                                    2번 포켓몬
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    점수
                                </td>
                                <td>
                                    ${result.A_포켓몬_점수}점
                                </td>
                                <td>
                                    ${result.B_포켓몬_점수}점
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    승률
                                </td>
                                <td>
                                    ${result.A_포켓몬_승률}%
                                </td>
                                <td>
                                    ${result.B_포켓몬_승률}%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary" onclick="rate_records1(${result.A_포켓몬_점수}, ${result.A_포켓몬_승률})">
                                        저장하기 
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary" onclick="rate_records2(${result.B_포켓몬_점수}, ${result.B_포켓몬_승률})">
                                        저장하기
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>`

            cal_content.innerHTML = html;

            // 경험치 기록 - 포켓몬 1:1 대결 비교, 5 경험치
            console.log(loginNo);   // 현재 로그인된 유저 번호 확인
            if (loginNo > 0) {  // 현재 로그인된 경우만 경험치 지급
                $.ajax({
                    async: false,
                    method: 'post',
                    url: '/exp/add',
                    data: {
                        expvalue: 5,
                        expmethod: '포켓몬 1:1 대결 비교',
                        loginUno: loginNo
                    },
                    success: (result) => {
                        console.log(result);


                    }   // success end
                })  // ajax end
            }

        }

    })

}

function rate_records1(score, rate) {
    let n1 = document.querySelector("#poke_select1").value;
    let m1 = document.querySelector("#poke_select_skill1").value;
    let result = 0;
    if (rate > 50) {
        result = 1;
    } else if (rate == 50) {
        result = 2;
    } else {
        result = 0;
    }
    $.ajax({
        async: false,
        method: "post",
        url: "/rate/record",
        data: {
            rscore: score,
            rrate: rate,
            rresult: result,
            rpokeindex: n1,
            rskillpower: m1,
            rhp: poke_stat1.HP,
            ratk: poke_stat1.ATK,
            rdef: poke_stat1.DEF,
            rspd: poke_stat1.SPD,
            rspatk: poke_stat1.SP_ATK,
            rspdef: poke_stat1.SP_DEF
        },
        success: function response(result) {
            if (result) {
                alert("승률 기록 성공");
                record_send();
            } else {
                alert("승률 기록 실패");
            }
        }
    })
}

function rate_records2(score, rate) {
    let n2 = document.querySelector("#poke_select2").value;
    let m2 = document.querySelector("#poke_select_skill2").value;
    let result = 0;
    if (rate > 50) {
        result = 1;
    } else if (rate == 50) {
        result = 2;
    } else {
        result = 0;
    }
    $.ajax({
        async: false,
        method: "post",
        url: "/rate/record",
        data: {
            rscore: score,
            rrate: rate,
            rresult: result,
            rpokeindex: n2,
            rskillpower: m2,
            rhp: poke_stat2.HP,
            ratk: poke_stat2.ATK,
            rdef: poke_stat2.DEF,
            rspd: poke_stat2.SPD,
            rspatk: poke_stat2.SP_ATK,
            rspdef: poke_stat2.SP_DEF
        },
        success: function response(result) {
            if (result) {
                alert("승률 기록 성공");
                record_send();
            } else {
                alert("승률 기록 실패");
            }
        }
    })
}

function record_send() {
    $.ajax({
        async: false,
        method: "get",
        url: "/rate/send",
        success: function response(result) {
            console.log(result);
            $.ajax({
                async: false,
                method: "post",
                url: "http://127.0.0.1:5000/rate_pred/take",
                data: JSON.stringify({ list: result }),
                contentType: 'application/json',
                success: function response(result1) {
                    console.log(result1);
                    console.log("데이터 전송 성공");
                }
            })
        }

    })
}

function poke_select3() {
    let select = document.querySelector("#poke_select3")
    let html = ``;
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/all_info",
        success: function response(result) {
            console.log(result);
            result.forEach((r, index) => {  // index: 0, 1, 2...
                html += `<option value=${index}>${r["한글이름"]} ${r["영어이름"]}</option>
                        `;
            })
            select.innerHTML = html;
        }

    })
}

function pred_print() {
    let poke_info = document.querySelector("#poke3");
    let n = document.querySelector("#poke_select3").value;
    let html = ``;
    let kr_type = "";
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate/data_info",
        data: { n: n },
        success: function response(result) {
            console.log(result)
            kr_type = type_trans(result.타입)
            html += `<tr>
                        <td>
                            <div class="cards">
                                <figure class="card">
                                    <img src="${result.이미지}" />
                                    <figcaption>${result.한글이름} <br>${result.영어이름} </figcaption>
                                </figure>
                            </div>
                        </td>
                        <td>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal2" onclick="rate_predict_from_model()">
                                예측 결과 보기
                        </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            체력
                        </td>
                        <td>
                            ${result.체력}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            공격
                        </td>
                        <td>
                            ${result.공격}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            방어
                        </td>
                        <td>
                            ${result.방어}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            스피드
                        </td>
                        <td>
                            ${result.스피드}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            특수공격
                        </td>
                        <td>
                            ${result.특수공격}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            특수방어
                        </td>
                        <td>
                            ${result.특수방어}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            타입
                        </td>
                        <td>
                            ${kr_type} ${result.타입}
                        </td>
                    </tr>
                    `;
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/rate/each_skill_info",
                data: { kr_name: result.한글이름 },
                success: function response(result) {
                    console.log(result);
                    html += `<tr>
                                        <td>
                                            기술 선택
                                        </td>
                                        <td>
                                            <select name="" id="poke_select_skill3">`
                    result.forEach(r => {
                        html += `
                                                <option value=${r.위력}>${r.기술이름} (${r.타입})</option>
                                                `;
                    })
                    html += `
                                            </select>
                                        </td>
                                    </tr>`;

                }
            })
            poke_info.innerHTML = html;
        }

    })
}

function rate_predict_from_model() {
    let poke_index = document.querySelector("#poke_select3").value;
    let rskillpower = document.querySelector("#poke_select_skill3").value;
    let rate_result = document.querySelector(".modal-body1")
    let html = ``;
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/rate_pred/predict",
        data: { poke_index: poke_index, rskillpower: rskillpower },
        success: function response(result) {
            console.log(result);
            html += `<table>
                        <thead>
                            <tr>
                                <th>
                                    예측 결과
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    ${Math.round(result[0])}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    `
            rate_result.innerHTML = html;

            // 경험치 기록 - 승률 예측, 5 경험치
            console.log(loginNo);   // 현재 로그인된 유저 번호 확인
            if (loginNo > 0) {  // 현재 로그인된 경우만 경험치 지급
                $.ajax({
                    async : false,
                    method : 'post',
                    url : '/exp/add',
                    data : {
                        expvalue : 5,
                        expmethod : '승률 예측',
                        loginUno : loginNo
                    },
                    success : (result) => {
                        console.log(result);                        
                    }   // success end
                })  // ajax end
            }   // if end
        }

    })

}

function type_trans(type) {
    if (type == "normal") {
        kr_type = "노말"
    } else if (type == "fire") {
        kr_type = "불"
    } else if (type == "water") {
        kr_type = "물"
    } else if (type == "electric") {
        kr_type = "전기"
    } else if (type == "grass") {
        kr_type = "풀"
    } else if (type == "ice") {
        kr_type = "얼음"
    } else if (type == "fighting") {
        kr_type = "격투"
    } else if (type == "poison") {
        kr_type = "독"
    } else if (type == "ground") {
        kr_type = "땅"
    } else if (type == "flying") {
        kr_type = "비행"
    } else if (type == "psychic") {
        kr_type = "에스퍼"
    } else if (type == "bug") {
        kr_type = "벌레"
    } else if (type == "rock") {
        kr_type = "바위"
    } else if (type == "ghost") {
        kr_type = "고스트"
    } else if (type == "dragon") {
        kr_type = "드래곤"
    } else if (type == "dark") {
        kr_type = "악"
    } else if (type == "steel") {
        kr_type = "강철"
    } else if (type == "fairy") {
        kr_type = "페어리"
    }
    return kr_type
}