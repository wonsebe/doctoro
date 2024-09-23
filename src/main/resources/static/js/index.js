console.log('index.js');

// 포켓몬 스토어 온라인 - 이벤트 페이지 일부 항목 크롤링 요청
//eventPokemon();
function eventPokemon() {       console.log('eventPokemon()');
    $.ajax({
        async : false,
        method : 'get',
        url : "http://localhost:5000/event/crawling",
        success : (result) => {     console.log(result);
            let middleContent = document.querySelector('#middleContent');

            let html =  ``;
            
            result.forEach(event => {
                html += `
                        <div>
                            <img id="eventImg" src="${event.이미지}" />
                            <div>${event.제목}</div>
                            <div>${event.작성일}</div>
                        </div>
                        `
            });
            console.log(html);

            middleContent.innerHTML = html;
        }   // success end
    })  // ajax end
}   // eventPokemon() end




