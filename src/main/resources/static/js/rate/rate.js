console.log("rate.js");

poke_select1();
poke_read1();
poke_select2();
poke_read2();
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
                                            <select name="" id="poke_select_skill2">`
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
            html += `<table>
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
                                    ${result.A_포켓몬_점수}
                                </td>
                                <td>
                                    ${result.B_포켓몬_점수}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    승률
                                </td>
                                <td>
                                    ${result.A_포켓몬_승률}
                                </td>
                                <td>
                                    ${result.B_포켓몬_승률}
                                </td>
                            </tr>
                            <tr>
                                <button type="button" class="btn btn-primary" onclick="rate_records1(${result.A_포켓몬_점수}, ${result.A_포켓몬_승률})">
                                    1번 포켓몬 승률 기록 남기기
                                </button>
                                <button type="button" class="btn btn-primary" onclick="rate_records2(${result.B_포켓몬_점수}, ${result.B_포켓몬_승률})">
                                    2번 포켓몬 승률 기록 남기기
                                </button>
                            </tr>
                        </tbody>
                    </table>`

            cal_content.innerHTML = html;
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
        data: { rscore: score, rrate: rate, rresult: result, rpokeindex: n1, rskillpower: m1 },
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
        data: { rscore: score, rrate: rate, rresult: result, rpokeindex: n2, rskillpower: m2 },
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