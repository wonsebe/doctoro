console.log("info_detail.js")

poke_detail_print()
function poke_detail_print() {
    let poke_info_detail = document.querySelector(".poke_info_detail");
    let html = ``;
    let urlParams = new URL(location.href).searchParams;
    let name = urlParams.get("name");
    let kr_type = "";
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/info/detail",
        data: { name: name },
        success: function response(result) {
            console.log(result);
            let poke_detail_info = result[0]
            console.log(poke_detail_info)
            kr_type = type_trans(poke_detail_info.타입)
            html += `<div>
                        <div class = "detail_info_top">
                            <div>
                                <table class = "table">
                                    <thead>
                                        <tr>
                                            <th colspan ="3">
                                                No.${poke_detail_info.아이디} ${poke_detail_info.한글이름} ${poke_detail_info.영어이름}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                타입
                                            </td>
                                            <td>
                                                ${kr_type} ${poke_detail_info.타입}
                                            </td>
                                            <td>
                                                ${poke_detail_info.한글정보} ${poke_detail_info.영어정보}
                                            </td>
                                        </tr>
                                        <tr class="table-info">
                                            <td>
                                                HP
                                            </td>
                                            <td>
                                                ${poke_detail_info.체력}
                                            </td>
                                            <td style = "align-content:center">
                                                <div style = "width : ${poke_detail_info.체력}px; background-color:#69dc12">
                                                    ${poke_detail_info.체력}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="table-warning">
                                            <td>
                                                공격
                                            </td>
                                            <td>
                                                ${poke_detail_info.공격}
                                            </td>
                                            <td style = "align-content:center">
                                                <div style = "width : ${poke_detail_info.공격}px; background-color:#efcc18">
                                                    ${poke_detail_info.공격}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="table-secondary">
                                            <td>
                                                방어
                                            </td>
                                            <td>
                                                ${poke_detail_info.방어}
                                            </td>
                                            <td style = "align-content:center">
                                                <div style = "width : ${poke_detail_info.방어}px; background-color:#e86412">
                                                    ${poke_detail_info.방어}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="table-success">
                                            <td>
                                                스피드
                                            </td>
                                            <td>
                                                ${poke_detail_info.스피드}
                                            </td>
                                            <td style = "align-content:center">
                                                <div style = "width : ${poke_detail_info.스피드}px; background-color:#14c3f1">
                                                    ${poke_detail_info.스피드}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="table-primary">
                                            <td>
                                                특수공격
                                            </td>
                                            <td>
                                                ${poke_detail_info.특수공격}
                                            </td>
                                            <td style = "align-content:center">
                                                <div style = "width : ${poke_detail_info.특수공격}px; background-color:#4a6adf">
                                                    ${poke_detail_info.특수공격}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="table-danger">
                                            <td>
                                                특수방어
                                            </td>
                                            <td>
                                                ${poke_detail_info.특수방어}
                                            </td>
                                            <td style = "align-content:center">
                                                <div style = "width : ${poke_detail_info.특수방어}px; background-color:#d51dad">
                                                    ${poke_detail_info.특수방어}
                                                </div>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <img src="${poke_detail_info.이미지}" class="detail_info_img">
                            </div>

                        </div>

                        <div class = "info_explain">
                            <table class = "table">
                                <thead>
                                    <tr>
                                        <th colspan = "2">
                                            도감 설명
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style = "align-content:center">
                                            ${poke_detail_info.한글정보2} <br>
                                            ${poke_detail_info.영어정보2}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style = "align-content:center">
                                            ${poke_detail_info.한글정보3} <br>
                                            ${poke_detail_info.영어정보3}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            
                    </div>`;

            poke_info_detail.innerHTML = html;
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