console.log('base-stats.js')

// 기본값 정렬
let sort = '';
let word = '';
let click = 0;      // 오름차순 내림차순 번호순 왔다갔다 할 수 있게 해주는 변수

// 상위 퍼센트 정렬
let sort2 = '';
let word2 = '';
let click2 = 0;      // 오름차순 내림차순 번호순 왔다갔다 할 수 있게 해주는 변수

// 포켓몬 종족값 목록 출력 - 기본 : 아이디(번호) 기준 정렬
baseStatsAllPrint('아이디');
function baseStatsAllPrint(name) {      console.log('baseStatsAllPrint()');
    console.log(name);

    // 해당하는 조건에 따라 오름차순 내림차순 번호순으로 정렬
    if (word == name && click == 0) {
        sort = '내림차순';
        click = 1;
    } else if (word == name && click == 1) {
        sort = '번호순';
        click = 2;
    } else {
        sort = '오름차순';
        click = 0;
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
            let thead = document.querySelector('thead > tr');
            let tbody = document.querySelector('tbody');
            let htmlTh = ``;
            let htmlTb = ``;

            htmlTh += `
                    <th> <button type="button" onclick="baseStatsAllPrint('아이디')">번호</button> </th>
                    <th> 이미지</th>
                    <th> <button type="button" onclick="baseStatsAllPrint('한글이름')">포켓몬</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('타입')">타입</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('체력')">체력</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('공격')">공격</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('방어')">방어</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('특수공격')">특수공격</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('특수방어')">특수방어</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('스피드')">스피드</button> </th>
                    <th> <button type="button" onclick="baseStatsAllPrint('총합')">총합</button> </th>
                    `

            result.forEach(포켓몬 => {
                // 종족값 총합 구하기
                let total = 포켓몬.체력
                            + 포켓몬.공격
                            + 포켓몬.방어
                            + 포켓몬.특수공격
                            + 포켓몬.특수방어
                            + 포켓몬.스피드;
                // console.log(total);

                htmlTb += `
                        <tr>
                            <td>${포켓몬.아이디}</td>
                            <td><img src="${포켓몬.이미지}" /></td>
                            <td>${포켓몬.한글이름} (${포켓몬.영어이름})</td>
                            <td>${포켓몬.타입}</td>
                            <td class="hp">${포켓몬.체력}</td>
                            <td class="attack">${포켓몬.공격}</td>
                            <td class="defense">${포켓몬.방어}</td>
                            <td class="sp-attack">${포켓몬.특수공격}</td>
                            <td class="sp-defense">${포켓몬.특수방어}</td>
                            <td class="speed">${포켓몬.스피드}</td>
                            <td>${total}</td>
                        </tr>
                        `
            })  // forEach end
            thead.innerHTML = htmlTh;
            tbody.innerHTML = htmlTb;
        }   // success end
    })  // ajax end
}   // baseStatsAllPrint() end

// 특정 종족값에 대한 상위 퍼센트 계산
// baseStatsPercentPrint('총합')
function baseStatsPercentPrint(stats) {      console.log('baseStatsPercentPrint()');
    console.log(stats);

    // 해당하는 조건에 따라 오름차순 내림차순 번호순으로 정렬
    if (word2 == stats && click2 == 0) {
        sort2 = '내림차순';
        click2 = 1;
    } else if (word2 == stats && click2 == 1) {
        sort2 = '번호순';
        click2 = 2;
    } else {
        sort2 = '오름차순';
        click2 = 0;
    }
    word2 = stats;
    console.log(sort2);

    $.ajax({
        async : false,
        method : 'post',
        url : "http://localhost:5000/base/stats/print/percent",
        contentType: 'application/json',
        data : JSON.stringify({ 
            stats : stats,
            sort : sort2
         }),
        success : (result) => {     console.log(result);
            let thead = document.querySelector('thead > tr');
            let tbody = document.querySelector('tbody');
            let htmlTh = ``;
            let htmlTb = ``;

            if (stats == '총합') {     // stats가 총합인 경우 if문 실행
                console.log('true');
                htmlTh += `
                        <th> <button type="button" onclick="baseStatsAllPrint('아이디')">번호</button> </th>
                        <th> 이미지</th>
                        <th> <button type="button" onclick="baseStatsAllPrint('한글이름')">포켓몬</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('타입')">타입</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('체력')">체력</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('공격')">공격</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('방어')">방어</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('특수공격')">특수공격</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('특수방어')">특수방어</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('스피드')">스피드</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('총합')">총합</button> </th>
                        <th> <button type="button" >상위 퍼센트</button> </th>
                        `
            } else {
                console.log('false');
                htmlTh += `
                        <th> <button type="button" onclick="baseStatsAllPrint('아이디')">번호</button> </th>
                        <th> 이미지</th>
                        <th> <button type="button" onclick="baseStatsAllPrint('한글이름')">포켓몬</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('타입')">타입</button> </th>
                        <th> <button type="button" onclick="baseStatsAllPrint('${stats}')">${stats}</button> </th>
                        <th> 상위 퍼센트 </th>
                        `
            }

            // stats 값에 따른 css class 값 부여
            let baseStatsTd = '';
            if (stats == '체력') {
                baseStatsTd = "hp"
            } else if (stats == '공격') {
                baseStatsTd = "attack"
            } else if (stats == '방어') {
                baseStatsTd = "defense"
            } else if (stats == '특수공격') {
                baseStatsTd = "sp-attack"
            } else if (stats == '특수방어') {
                baseStatsTd = "sp-defense"
            } else if (stats == '스피드') {
                baseStatsTd = "speed"
            }
            console.log(baseStatsTd);

            result.forEach(포켓몬 => {
                if (stats == '총합') {
                    htmlTb += `
                            <tr>
                                <td>${포켓몬.아이디}</td>
                                <td><img src="${포켓몬.이미지}" /></td>
                                <td>${포켓몬.한글이름} (${포켓몬.영어이름})</td>
                                <td>${포켓몬.타입}</td>
                                <td class="hp">${포켓몬.체력}</td>
                                <td class="attack">${포켓몬.공격}</td>
                                <td class="defense">${포켓몬.방어}</td>
                                <td class="sp-attack">${포켓몬.특수공격}</td>
                                <td class="sp-defense">${포켓몬.특수방어}</td>
                                <td class="speed">${포켓몬.스피드}</td>
                                <td>${포켓몬.총합}</td>
                                <td>${포켓몬.상위퍼센트}%</td>
                            </tr>
                            `
                } else {
                    htmlTb += `
                            <tr>
                                <td>${포켓몬.아이디}</td>
                                <td><img src="${포켓몬.이미지}" /></td>
                                <td>${포켓몬.한글이름} (${포켓몬.영어이름})</td>
                                <td>${포켓몬.타입}</td>
                                <td class="${baseStatsTd}">${포켓몬[stats]}</td>
                                <td>${포켓몬.상위퍼센트}%</td>
                            </tr>
                            `
                }

            })  // forEach end
            thead.innerHTML = htmlTh;
            tbody.innerHTML = htmlTb;
        }   // success end
    })  // ajax end
}   // baseStatsPercentPrint() end




