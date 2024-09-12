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
                html += `<option value=${index}>${r["한글이름"]}, ${r["영어이름"]}</option>
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
                            <img src="${result.이미지}">
                        <td>
                    </tr>
                    <tr>
                        <td>
                            이름
                        </td>
                        <td>
                            ${result.한글이름}, ${result.영어이름}
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
                url: "http://127.0.0.1:5000/rate/all_skill",
                success: function response(result) {
                    console.log(result);
                    html += `<tr>
                                <td>
                                    기술 선택
                                </td>
                                <td>
                                    <select name="" id="poke_select_skill1">`
                    result.forEach((r, index) => {
                        html += `
                                        <option value=${index}>${r.스킬이름} (${r.타입})</option>
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
                html += `<option value=${index}>${r["한글이름"]}, ${r["영어이름"]}</option>
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
                            <img src="${result.이미지}">
                        <td>
                    </tr>
                    <tr>
                        <td>
                            이름
                        </td>
                        <td>
                            ${result.한글이름}, ${result.영어이름}
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
                url: "http://127.0.0.1:5000/rate/all_skill",
                success: function response(result) {
                    console.log(result);
                    html += `<tr>
                                        <td>
                                            기술 선택
                                        </td>
                                        <td>
                                            <select name="" id="poke_select_skill2">`
                    result.forEach((r, index) => {
                        html += `
                                                <option value=${index}>${r.스킬이름} (${r.타입})</option>
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
    n1 = document.querySelector("#poke_select1").value;
    n2 = document.querySelector("#poke_select2").value;
    m1 = document.querySelector("#poke_select_skill1").value;
    m2 = document.querySelector("#poke_select_skill2").value;
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

                        </tbody>
                    </table>`

            cal_content.innerHTML = html;
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