console.log("voteCity");

read_all_city_info();
function read_all_city_info() {
    let tbody = document.querySelector(".cityinfo");
    let html = ``;
    $.ajax({
        async: false,
        method: "get",
        url: "/vote/read",
        success: function response(result) {
            console.log(result);
            result.forEach(r => {
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
                                <button type="button"> 투표하기 </button>
                            </td>
                        </tr>`;
            })
            tbody.innerHTML = html;
        }
    })
}