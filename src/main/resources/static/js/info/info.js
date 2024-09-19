console.log("info.js")




let type_list = [
    {"0" : "전체"},
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

function poke_type_info(page=1){
    let type = document.querySelector("#poke_select").value;
    let info_area = document.querySelector(".info_area");
    let html = ``;

    if(type == "0"){
        all_poke_info(0);
        return;
    }
    $.ajax({
        async: false,
        method: "get",
        url: "http://127.0.0.1:5000/info/type",
        data: { page: page, type : type },
        success: function response(result) {
            console.log(result);
            // let poke_all_info = result[0]
            // console.log(poke_all_info)
            // let poke_all_info_keys = Object.keys(poke_all_info)
            // console.log(poke_all_info_keys)
            // console.log()
            result.forEach(r => {
                //console.log(poke_all_info[k])

                html += `<div class = "info_area_detail">
                                <div> 
                                    <a href="/info/detail?name=${r["영어이름"]}">
                                        <img src="${r["이미지"]}">  
                                    </a>
                                </div>
                                <div>
                                    <a href="/info/detail?name=${r["영어이름"]}"> 
                                        ${r["한글이름"]}
                                    </a> 
                                </div>
                                <div>
                                    <a href="/info/detail?name=${r["영어이름"]}"> 
                                        ${r["영어이름"]}
                                    </a> 
                                </div>
                                
                            </div>`

            })
            info_area.innerHTML = html;
            console.log(result.length)
            console.log(Math.round(result.length / 100))
            
            let paginationBox = document.querySelector('.pagination');
            let pageHTML = '';
            let page_num = Math.floor(result.length / 100)

            for (let i = 0; i <= page_num; i++) { //for start 반복문을 돌려서
                pageHTML += `
                <li class="page-item${i}">
                <a class="page-link" href="#" onclick="poke_type_info(${i + 1})">${i + 1}</a>
                </li>
                `;
                //페이지의 번호와 데이터에 맞는 버튼 생성

            } //for end


            //페이지네이션 버튼출력


            paginationBox.innerHTML = pageHTML;
            
        }
    })
}

function poke_search(page=1){
    let type = document.querySelector("#poke_select").value;
    let info_area = document.querySelector(".info_area");
    let html = ``;
    let search = document.querySelector("#search").value;
    let en_value = /[a-zA-Z]/;
    let kr_value = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (type == "0"){ 
        if(en_value.test(search)){
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/info/en_search",
                data: { page: page, search : search },
                success: function response(result) {
                    console.log(result);
                    // let poke_all_info = result[0]
                    // console.log(poke_all_info)
                    // let poke_all_info_keys = Object.keys(poke_all_info)
                    // console.log(poke_all_info_keys)
                    // console.log()
                    result.forEach(r => {
                        //console.log(poke_all_info[k])
        
                        html += `<div class = "info_area_detail">
                                        <div> 
                                            <a href="/info/detail?name=${r["영어이름"]}">
                                                <img src="${r["이미지"]}">  
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["한글이름"]}
                                            </a> 
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["영어이름"]}
                                            </a> 
                                        </div>
                                        
                                    </div>`
        
                    })
                    info_area.innerHTML = html;
                    console.log(result.length)
                    console.log(Math.round(result.length / 100))
                    
                    let paginationBox = document.querySelector('.pagination');
                    let pageHTML = '';
                    let page_num = Math.floor(result.length / 100)
        
                    for (let i = 0; i <= page_num; i++) { //for start 반복문을 돌려서
                        pageHTML += `
                        <li class="page-item${i}">
                        <a class="page-link" href="#" onclick="poke_search(${i + 1})">${i + 1}</a>
                        </li>
                        `;
                        //페이지의 번호와 데이터에 맞는 버튼 생성
        
                    } //for end
        
        
                    //페이지네이션 버튼출력
        
        
                    paginationBox.innerHTML = pageHTML;
                }
            })
        }
        else if(kr_value.test(search)){
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/info/kr_search",
                data: { page: page, search : search },
                success: function response(result) {
                    console.log(result);
                    // let poke_all_info = result[0]
                    // console.log(poke_all_info)
                    // let poke_all_info_keys = Object.keys(poke_all_info)
                    // console.log(poke_all_info_keys)
                    // console.log()
                    result.forEach(r => {
                        //console.log(poke_all_info[k])
        
                        html += `<div class = "info_area_detail">
                                        <div> 
                                            <a href="/info/detail?name=${r["영어이름"]}">
                                                <img src="${r["이미지"]}">  
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["한글이름"]}
                                            </a> 
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["영어이름"]}
                                            </a> 
                                        </div>
                                        
                                    </div>`
        
                    })
                    info_area.innerHTML = html;
                    console.log(result.length)
                    console.log(Math.round(result.length / 100))
                    
                    let paginationBox = document.querySelector('.pagination');
                    let pageHTML = '';
                    let page_num = Math.floor(result.length / 100)
        
                    for (let i = 0; i <= page_num; i++) { //for start 반복문을 돌려서
                        pageHTML += `
                        <li class="page-item${i}">
                        <a class="page-link" href="#" onclick="poke_search(${i + 1})">${i + 1}</a>
                        </li>
                        `;
                        //페이지의 번호와 데이터에 맞는 버튼 생성
        
                    } //for end
        
        
                    //페이지네이션 버튼출력
        
        
                    paginationBox.innerHTML = pageHTML;
                }
            })
        }
    }else{
        if(en_value.test(search)){
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/info/type_en_search",
                data: { page: page, search : search, type : type  },
                success: function response(result) {
                    console.log(result);
                    // let poke_all_info = result[0]
                    // console.log(poke_all_info)
                    // let poke_all_info_keys = Object.keys(poke_all_info)
                    // console.log(poke_all_info_keys)
                    // console.log()
                    result.forEach(r => {
                        //console.log(poke_all_info[k])
        
                        html += `<div class = "info_area_detail">
                                        <div> 
                                            <a href="/info/detail?name=${r["영어이름"]}">
                                                <img src="${r["이미지"]}">  
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["한글이름"]}
                                            </a> 
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["영어이름"]}
                                            </a> 
                                        </div>
                                        
                                    </div>`
        
                    })
                    info_area.innerHTML = html;
                    console.log(result.length)
                    console.log(Math.round(result.length / 100))
                    
                    let paginationBox = document.querySelector('.pagination');
                    let pageHTML = '';
                    let page_num = Math.floor(result.length / 100)
        
                    for (let i = 0; i <= page_num; i++) { //for start 반복문을 돌려서
                        pageHTML += `
                        <li class="page-item${i}">
                        <a class="page-link" href="#" onclick="poke_search(${i + 1})">${i + 1}</a>
                        </li>
                        `;
                        //페이지의 번호와 데이터에 맞는 버튼 생성
        
                    } //for end
        
        
                    //페이지네이션 버튼출력
        
        
                    paginationBox.innerHTML = pageHTML;
                }
            })
        }
        else if(kr_value.test(search)){
            $.ajax({
                async: false,
                method: "get",
                url: "http://127.0.0.1:5000/info/type_kr_search",
                data: { page: page, search : search, type : type },
                success: function response(result) {
                    console.log(result);
                    // let poke_all_info = result[0]
                    // console.log(poke_all_info)
                    // let poke_all_info_keys = Object.keys(poke_all_info)
                    // console.log(poke_all_info_keys)
                    // console.log()
                    result.forEach(r => {
                        //console.log(poke_all_info[k])
        
                        html += `<div class = "info_area_detail">
                                        <div> 
                                            <a href="/info/detail?name=${r["영어이름"]}">
                                                <img src="${r["이미지"]}">  
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["한글이름"]}
                                            </a> 
                                        </div>
                                        <div>
                                            <a href="/info/detail?name=${r["영어이름"]}"> 
                                                ${r["영어이름"]}
                                            </a> 
                                        </div>
                                        
                                    </div>`
        
                    })
                    info_area.innerHTML = html;
                    console.log(result.length)
                    console.log(Math.round(result.length / 100))
                    
                    let paginationBox = document.querySelector('.pagination');
                    let pageHTML = '';
                    let page_num = Math.floor(result.length / 100)
        
                    for (let i = 0; i <= page_num; i++) { //for start 반복문을 돌려서
                        pageHTML += `
                        <li class="page-item${i}">
                        <a class="page-link" href="#" onclick="poke_search(${i + 1})">${i + 1}</a>
                        </li>
                        `;
                        //페이지의 번호와 데이터에 맞는 버튼 생성
        
                    } //for end
        
        
                    //페이지네이션 버튼출력
        
        
                    paginationBox.innerHTML = pageHTML;
                }
            })
        }
    }

}   