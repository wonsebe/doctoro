//클릭 횟수 증가
function clickup(pno){
    console.log(pno);
    $.ajax({
        async: false,
        url : '/rank/click',
        method : 'PUT',
        data : { pno : pno} ,
        success : (r) => {
            console.log(r);
        },
        error : (e) => {
            console.log(e);
        }
    })
}
//////////////////////////////////////////////////
//승리횟수  증가
function winup(pno){
    console.log(pno);
    $.ajax({
        async: false,
        url : '/rank/win',
        method : 'PUT',
        data : { pno : pno} ,
        success : (r) => {
            console.log(r);
        },
        error : (e) => {
            console.log(e);
        }
    })
}
//////////////////////////////////////////////////////////////
let selectRound = [ 'r64' , 'r32' , 'r16' , 'r8' , 'r4' , 'r2' ]
let selectNo = 0
let win = ''
function selectround(){
    num = 0;
    let set_size = document.querySelector('.roundcate').value;
    console.log(set_size);
    $.ajax({
        async:false,
        url : 'http://localhost:5000/tnmt',
        method : 'get',
        data : { set_size : set_size},
        success : (r) => {
//            console.log(r);
            //r.이미지,이름,아이디 가져와서 랜덤으로 띄우고 빼고 리스트에 반복시켜서 만들기
            // --- 1. 16(32) 8(16) 4(8)
            if(r.length == 64){포켓몬목록['r64'] = r; selectNo = 0 }
            if(r.length == 32){포켓몬목록['r32'] = r; selectNo = 1 }
            if(r.length == 16){포켓몬목록['r16'] = r ; selectNo = 2 }
            if(r.length == 8){포켓몬목록['r8'] = r; selectNo = 3 }
            if(r.length == 4){포켓몬목록['r4'] = r ; selectNo = 4 }
//            console.log(포켓몬목록['r64'])
//            console.log(포켓몬목록['r32'])
//            console.log(포켓몬목록['r16'])
//            console.log(포켓몬목록['r8'])
//            console.log(포켓몬목록['r4'])

        }
    })
게임시작()
}

포켓몬목록 = {
    r64 : [],
    r32 : [],
    r16 : [],
    r8 : [],
    r4 : [],
    r2 : [],
    win : []
}


function 게임시작(){
//    console.log(포켓몬목록['r64'])
    console.log( 포켓몬목록[`${selectNo}`])

        while( true ){
            num1 = Math.floor(Math.random() * 포켓몬목록[`${selectRound[selectNo]}`].length);
            num2 = Math.floor(Math.random() * 포켓몬목록[`${selectRound[selectNo]}`].length);

            if (num1 === num2){
                continue
            }else{
                break
            }
        }

        console.log(num1, num2);

        let ch1 = document.querySelector('.ch1');
        let ch2 = document.querySelector('.ch2');
        let tround = document.querySelector('.tround');

        con1 = 포켓몬목록[`${selectRound[selectNo]}`][num1][2]
        con2 = 포켓몬목록[`${selectRound[selectNo]}`][num2][2]

        name1 = 포켓몬목록[`${selectRound[selectNo]}`][num1][0]
        name2 = 포켓몬목록[`${selectRound[selectNo]}`][num2][0]

        html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택(${ num1 },${ num2 } )"> <br/> <span> ${name1} </span> </td> </tr>`
        html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택(${ num2 },${ num1 } )"> <br/> <span> ${name2} </span> </td> </tr>`
        html3 = `<tr> <td> ${selectRound[selectNo]}강/${포켓몬목록[`${selectRound[selectNo]}`].length} </td> </tr>`

        ch1.innerHTML = html1
        ch2.innerHTML = html2
        tround.innerHTML = html3

//        if(포켓몬목록[`${selectNo}`][0].length == 0){round32();}
//        console.log(포켓몬목록['r32'])
}

function 포켓몬선택(index, index2){

    if( selectNo+1 == selectRound.length ){
        winpage()
//        win = 포켓몬목록[`${selectRound[selectNo]}`][index][0]

        return
    }

    console.log(포켓몬목록[`${selectRound[selectNo]}`][index])
    if( 포켓몬목록[`${selectRound[selectNo]}`][index] == 'undefined' ) return
    포켓몬목록[`${selectRound[selectNo+1]}`].push( 포켓몬목록[`${selectRound[selectNo]}`][index] )
        //포켓몬목록[`${selectRound[selectNo]}`][0].splice(index, 1);
        //포켓몬목록[`${selectRound[selectNo]}`][0].splice(index2, 1);
    포켓몬목록[`${selectRound[selectNo]}`] = 포켓몬목록[`${selectRound[selectNo]}`].filter((v, i) => {
        return i !== index && i !== index2;
    });
    console.log( 포켓몬목록 )

    // 다음 라운드 넘어가기
    if( 포켓몬목록[`${selectRound[selectNo]}`].length == 0 ) {
        selectNo += 1
    }


    게임시작();
}

function winpage (){ //우승자 출력페이지 매핑 수정중
    window.location.href = "http://localhost:8080/rank/win"

    $.ajax({
        async : false,
        url : 'http://localhost:5000/rank/win',
        method : 'GET',
        success : (r) => {
    })

            num = 포켓몬목록[`${selectRound[selectNo]}`][index][2]
    //        alert( win )

            let winnerimg = document.querySelector('.winnerimg');
            let winnername = document.querySelector('.winnername');

            html = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" />`;
            html2 = `<span> 포켓몬목록[${selectRound[selectNo]}][index][0] </span>`;

            winnerimg.innerHTML = html
            winnername.innerHTML = html2
}