console.log("voteCity");

let limit = 1;  // 체크박스 제한
let count = 0;  // 체크박스 숫자 세기
let btn_count = 0;  // 1등 2등 3등 구분 
let index = 0;

let value = ``;

let index_obj = { poll_city_first: 0, poll_city_second: 0, poll_city_third: 0, uno: 0 };

read_all_city_info();
check_user_info();
function read_all_city_info() {
    let tbody = document.querySelector(".cityinfo");
    let btnArea = document.querySelector(".btnArea");
    let html = ``;
    let btn_html = ``;
    $.ajax({
        async: false,
        method: "get",
        url: "/vote/read",
        success: function response(result) {
            console.log(result);
            result.forEach((r, i) => {
                html += `
                        <tr>
                            <td>
                                <img width = "190px" src="${r.poll_city_img_src}">
                            </td>
                            <td>
                                ${r.poll_city_title}
                            </td>
                            <td>    
                                ${r.poll_city_content}
                            </td>
                            <td>
                                ${r.poll_city_motive}
                            </td>
                            <td>
                                <input class = "index" onclick="check_num(this)" type="checkbox" name = "index" value = "${i + 1}">
                            </td>
                        </tr>`;

            })
            tbody.innerHTML = html;

            btn_html += `<button type="button" onclick="vote_record(${btn_count})"> 투표하기 </button>`;

            btnArea.innerHTML = btn_html;
        }
    })
}


function check_user_info() {
    $.ajax({
        async: false,
        method: "get",
        url: "/user/login/check",
        success: function response(result) {
            let uno = result["uno"]
            index_obj["uno"] = uno
        }
    })
}

function check_num(num) {
    if (num.checked) {
        count++;
        let check = `input[name = "index"]:checked`;
        value = document.querySelector(check).value;
        console.log(value)
    } else {
        count--;
        value = ``;
    }
    if (count > limit) {
        alert("1개만 체크해주세요.");
        num.checked = false;
        count--;
    }
}

function vote_record(i) {
    if (i == 0) {
        index_obj["poll_city_first"] = parseInt(value);
        btn_count++;
        count = 0;
        console.log(index_obj);
        read_all_city_info();
        location.href = "#"
    } else if (i == 1) {
        index_obj["poll_city_second"] = parseInt(value);
        btn_count++;
        count = 0;
        console.log(index_obj);
        read_all_city_info();
        location.href = "#"
    } else {
        index_obj["poll_city_third"] = parseInt(value);
        btn_count = 0;
        count = 0;
        console.log(index_obj);
        if (index_obj["poll_city_first"] == index_obj["poll_city_second"]
            || index_obj["poll_city_second"] == index_obj["poll_city_third"]
            || index_obj["poll_city_third"] == index_obj["poll_city_first"]
        ) {
            alert("같은 마을을 투표할 수는 없습니다. 다시 투표해주세요")
            index_obj["poll_city_first"] = 0;
            index_obj["poll_city_second"] = 0;
            index_obj["poll_city_third"] = 0;
            read_all_city_info();
            location.href = "#"
        } else {
            $.ajax({
                async: false,
                method: "post",
                url: "/vote/record",
                data: index_obj,
                success: function response(result) {
                    if (result) {
                        alert("투표가 완료되었습니다.");
                        location.href = "/rank/enter";
                    } else {
                        alert("오류가 발생했습니다. 다시 투표해주세요.");
                        read_all_city_info();
                    }
                }
            })
        }
    }
}