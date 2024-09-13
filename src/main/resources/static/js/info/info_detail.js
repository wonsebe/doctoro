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
            html += `<table>
                            <thead>
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        포켓몬 정보
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        이미지
                                    </td>
                                    <td>
                                        <img src="${poke_detail_info.이미지}">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        도감번호
                                    </td>
                                    <td>
                                        ${poke_detail_info.아이디}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        이름
                                    </td>
                                    <td>
                                        ${poke_detail_info.한글이름} ${poke_detail_info.영어이름}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        체력
                                    </td>
                                    <td>
                                        ${poke_detail_info.체력}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        공격
                                    </td>
                                    <td>
                                        ${poke_detail_info.공격} 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        방어
                                    </td>
                                    <td>
                                        ${poke_detail_info.방어}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        스피드
                                    </td>
                                    <td>
                                        ${poke_detail_info.스피드}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        특수공격
                                    </td>
                                    <td>
                                        ${poke_detail_info.특수공격}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        특수방어
                                    </td>
                                    <td>
                                        ${poke_detail_info.특수방어}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        타입
                                    </td>
                                    <td>
                                        ${kr_type} ${poke_detail_info.타입}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        정보1
                                    </td>
                                    <td>
                                        ${poke_detail_info.한글정보} ${poke_detail_info.영어정보}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        정보2
                                    </td>
                                    <td>
                                        ${poke_detail_info.한글정보2}</br>${poke_detail_info.영어정보2}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        정보3
                                    </td>
                                    <td>
                                        ${poke_detail_info.한글정보3} ${poke_detail_info.영어정보3}
                                    </td>
                                </tr>
                            </tbody>
                        </table>`;

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