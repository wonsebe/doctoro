console.log("info.js")




let type_list = [
    { "normal": "노말" },
    { "fire": "불" },
    { "water": "물" },
    { "electric": "전기" },
    { "grass": "풀" },
    { "ice": "얼음" },
    { "fighting": "격투" },
    { "poison": "독" },
    { "ground": "땅" },
    { "flying": "비행" },
    { "psychic": "에스퍼" },
    { "bug": "벌레" },
    { "rock": "바위" },
    { "ghost": "고스트" },
    { "dragon": "드래곤" },
    { "dark": "악" },
    { "steel": "강철" },
    { "fairy": "페어리" }
]


select_type()
all_poke_info()

function select_type() {
    let type_select = document.querySelector("#poke_select")
    let html = ``;

    type_list.forEach(t => {
        console.log(t)
        console.log(Object.keys(t))
        console.log(t[Object.keys(t)])
        html += `<option value=${Object.keys(t)}> ${t[Object.keys(t)]}</option>`;
    })
    type_select.innerHTML = html;
}

function all_poke_info(page = 0) {
    let info_area = document.querySelector(".info_area");
    let html = ``;
    let page_in_print = page * 100
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/info/print",
        data: { page: page_in_print },
        success: function response(result) {
            console.log(result);
            let poke_all_info = result[0]
            //console.log(poke_all_info)
            let poke_all_info_keys = Object.keys(poke_all_info)
            //console.log(poke_all_info_keys)

            poke_all_info_keys.forEach(k => {
                //console.log(poke_all_info[k])

                html += `<div class = "info_area_detail">
                                <div> 
                                    <a href="/info/detail?name=${poke_all_info[k]["영어이름"]}">
                                        <img src="${poke_all_info[k]["이미지"]}">  
                                    </a>
                                </div>
                                <div>
                                    <a href="/info/detail?name=${poke_all_info[k]["영어이름"]}"> 
                                        ${poke_all_info[k]["한글이름"]}
                                    </a> 
                                </div>
                                <div>
                                    <a href="/info/detail?name=${poke_all_info[k]["영어이름"]}"> 
                                        ${poke_all_info[k]["영어이름"]}
                                    </a> 
                                </div>
                                
                            </div>`

            })
            info_area.innerHTML = html;


            let paginationBox = document.querySelector('.pagination');
            let pageHTML = '';


            for (let i = 0; i <= 10; i++) { //for start 반복문을 돌려서
                pageHTML += `
                <li class="page-item${i}">
                <a class="page-link" href="#" onclick="all_poke_info(${i})">${i + 1}</a>
                </li>
                `;
                //페이지의 번호와 데이터에 맞는 버튼 생성

            } //for end


            //페이지네이션 버튼출력


            paginationBox.innerHTML = pageHTML;

        }
    })
}