console.log('index.js');

// 포켓몬 스토어 온라인 - 이벤트 페이지 일부 항목 크롤링 요청
eventPokemon();
checkuinfo();

function eventPokemon() {       console.log('eventPokemon()');
    $.ajax({
        async : false,
        method : 'get',
        url : "http://localhost:5000/event/crawling",
        success : (result) => {     console.log(result);
            let slides = document.querySelector('.slides');

            let html =  ``;
            
            result.forEach(event => {
                html += `
                        <li>
                            <a href="${event.링크}"> <img id="eventImg" src="${event.이미지}" /> </a>
                            <div>${event.제목}</div>
                            <div>${event.작성일}</div>
                        </li>
                        `
            });
            console.log(html);

            slides.innerHTML = html;
        }   // success end
    })  // ajax end
}   // eventPokemon() end


// 이벤트 항목 멀티 슬라이드
var slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides li'),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = 300,
    slideMargin = 30,
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next');

slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

function moveSlide(num) {
    slides.style.left = -num * 330 + 'px';
    currentIdx = num;
}

nextBtn.addEventListener('click', function () {
    if( currentIdx < slideCount - 3){
        moveSlide(currentIdx + 1);
    }else{
        moveSlide(0);
    }   
});

prevBtn.addEventListener('click', function () {
    if( currentIdx > 0){
        moveSlide(currentIdx - 1);
    }else{
        moveSlide(slideCount - 3);
    }   
});

//유저 정보 가져오기
function checkuinfo(){
    alert('123');
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : r => {
            console.log(r['gender'])
            console.log(r['ubirth'])

            let birth = r['ubirth']
            let ebirth = birth.slice(0,4)
            let ubirth = Number(ebirth)
            ubirth = 2024 - ubirth
            console.log(typeof(ubirth))

            let gender = r['gender']
            if(gender == 'M'){gender = 1}
            else if(gender == 'F'){gender = 0}
            console.log(gender)

            $.ajax({
                async : false,
                method : 'get',
                url : 'http://localhost:5000/model',
                data : {ubirth : ubirth, gender : gender },
                success : (result) => {
                    console.log(result)
                    let card = document.querySelector('.card');
                    html = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result}.png">`
                    card.innerHTML = html
                    alert('456');
                },
                error : x => {
                    console.log(x)
                    console.log('error')
                    alert('789');
                }
            })

        }
    })
}
