console.log('base-stats.js')

let num = 0;    // 번호 오름차순 내림차순 구분

// 포켓몬 종족값 목록 출력 -> 아이디 (번호) 기준
baseStatsAllPrint();
function baseStatsAllPrint() {      console.log('baseStatsAllPrint()');
    if (num == 0) {     // 번호 기준 오름차순
        // Flask 서버에 통신
        $.ajax({
            async : false,
            method : 'get',
            url : "http://localhost:5000/base/stats/print",
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

        num = 1;
    } else {    // 번호 기준 내림차순
        // Flask 서버에 통신
        $.ajax({
            async : false,
            method : 'get',
            url : "http://localhost:5000/base/stats/print/pokeno",
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

        num = 0;
    }
}   // baseStatsAllPrint() end



