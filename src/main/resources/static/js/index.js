console.log('index.js');

// 포켓몬 스토어 온라인 - 이벤트 페이지 일부 항목 크롤링 요청
eventPokemon();
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


