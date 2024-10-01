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

var slides = document.querySelector('.slides');
console.log( slides )
var slide = document.querySelectorAll('.slides li');
console.log( slide )
var currentIdx = 0;
var slideCount = slide.length;
var  slideWidth = 300;
var slideMargin = 30;
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + 'px';


function moveSlide(num) {
    slides.style.left = -num * 330 + 'px';
    currentIdx = num;
}
function onPrev(){
    if( currentIdx > 0){
        moveSlide(currentIdx - 1);
    }else{
        moveSlide(slideCount - 3);
    }
}
function onNext(){
    if( currentIdx < slideCount - 3){
        moveSlide(currentIdx + 1);
    }else{
        moveSlide(0);
    }
}


//유저 정보 가져오기
checkuinfo();
function checkuinfo(){
//    alert('123');
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

            let random1 = Math.floor(100 + Math.random() * 800);
            let random2 = Math.floor(100 + Math.random() * 800);
            let random3 = Math.floor(100 + Math.random() * 800);
            let random4 = Math.floor(100 + Math.random() * 800);

            console.log(random1)
            console.log(random2)
            console.log(random3)
            console.log(random4)

            $.ajax({
                async : false,
                method : 'get',
                url : 'http://localhost:5000/model',
                data : {ubirth : ubirth, gender : gender },
                success : (result) => {
                    console.log(result)
                    let procard = document.querySelector('.procard');
                    html = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result}.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>`

                    let card1 = document.querySelector('.card1')
                    html1 = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random1}.png" class="card-img-top" alt="...">
                             <div class="card-body1">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                             </div>`

                    let card2 = document.querySelector('.card2')
                    html2 = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random2}.png" class="card-img-top" alt="...">
                             <div class="card-body2">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                             </div>`

                    let card3 = document.querySelector('.card3')
                    html3 = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random3}.png" class="card-img-top" alt="...">
                             <div class="card-body3">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                             </div>`

                    let card4 = document.querySelector('.card4')
                    html4 = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random4}.png" class="card-img-top" alt="...">
                             <div class="card-body4">
                             <h5 class="card-title">Card title</h5>
                             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                             </div>`

                    procard.innerHTML = html
                    card1.innerHTML = html1
                    card2.innerHTML = html2
                    card3.innerHTML = html3
                    card4.innerHTML = html4

                    $.ajax({
                        async : false,
                        method : 'get',
                        url : 'http://localhost:5000/pokeinfos',
                        success : e => {
                            console.log(e[result-1])
                            let cardbod = document.querySelector('.card-body')
                            html = `<h5 class="card-title">${e[result-1]['한글이름']}</h5>
                                    <p class="card-text"> ${e[result-1]['한글정보2']} </p>`;

                            let card1 = document.querySelector('.card-body1')
                            html1 = `<h5 class="card-title">${e[random1-1]['한글이름']}</h5>
                                     <p class="card-text">${e[random1-1]['한글정보2']}</p>`

                            let card2 = document.querySelector('.card-body2')
                            html2 = `<h5 class="card-title">${e[random2-1]['한글이름']}</h5>
                                     <p class="card-text">${e[random2-1]['한글정보2']}</p>`

                            let card3 = document.querySelector('.card-body3')
                            html3 = `<h5 class="card-title">${e[random3-1]['한글이름']}</h5>
                                     <p class="card-text">${e[random3-1]['한글정보2']}</p>`

                            let card4 = document.querySelector('.card-body4')
                            html4 = `<h5 class="card-title">${e[random4-1]['한글이름']}</h5>
                                     <p class="card-text">${e[random4-1]['한글정보2']}</p>`

                            cardbod.innerHTML = html;
                            card1.innerHTML = html1;
                            card2.innerHTML = html2;
                            card3.innerHTML = html3;
                            card4.innerHTML = html4
                        }
                    })
//                    alert('456');
                },
                error : x => {
                    console.log(x)
                    console.log('error')
//                    alert('789');
                }
            })

        }
    })
}
