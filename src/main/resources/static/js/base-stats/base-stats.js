console.log('base-stats.js')

let sort = '';
let word = '';
let click = 0;      // 오름차순 내림차순 왔다갔다 할 수 있게 해주는 변수

// 포켓몬 종족값 목록 출력 - 기본 : 아이디(번호) 기준 정렬
baseStatsAllPrint('아이디');
function baseStatsAllPrint(name) {      console.log('baseStatsAllPrint()');
    console.log(name);

    // 같은 버튼을 연속해서 누른 경우 내림차순으로 정렬
    if (word == name && click == 1) {
        sort = '내림차순';
        click = 0;
    } else {
        sort = '오름차순';
        click = 1;
    }
    word = name;
    

    // Flask 서버에 통신
    $.ajax({
        async : false,
        method : 'post',
        url : "http://localhost:5000/base/stats/print/all",
        contentType: 'application/json',
        data: JSON.stringify({
            name : name,
            sort : sort
        }),
        success : (result) => {     console.log(result);
            let tbody = document.querySelector('tbody');
            let html = ``;
            result.forEach(포켓몬 => {
                // 종족값 총합 구하기
                let total = 포켓몬.체력
                            + 포켓몬.공격
                            + 포켓몬.방어
                            + 포켓몬.특수공격
                            + 포켓몬.특수방어
                            + 포켓몬.스피드;
                // console.log(total);

                html += `
                        <tr>
                            <td>${포켓몬.아이디}</td>
                            <td><img src="${포켓몬.이미지}" /></td>
                            <td>${포켓몬.한글이름} (${포켓몬.영어이름})</td>
                            <td>${포켓몬.타입}</td>
                            <td>${포켓몬.체력}</td>
                            <td>${포켓몬.공격}</td>
                            <td>${포켓몬.방어}</td>
                            <td>${포켓몬.특수공격}</td>
                            <td>${포켓몬.특수방어}</td>
                            <td>${포켓몬.스피드}</td>
                            <td>${total}</td>
                        </tr>
                        `
            })  // forEach end
            tbody.innerHTML = html;
        }   // success end
    })  // ajax end
}   // baseStatsAllPrint() end






