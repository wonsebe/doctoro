
//포켓몬목록 = {
//    r64 : [],
//    r32 : [],
//    r16 : [],
//    r8 : [],
//    r4 : [],
//    r2 : [],
//}

r64 = []
r32 = []
r16 = []
r8 = []
r4 = []
r2 = []

//목록 = []
강목록 = [ 'r64' , 'r32', 'r16', 'r8', 'r4'  ]

function 포켓몬선택( index ){

    console.log(index)
    console.log(r64[0][index])
    console.log(r64[0][index][0])

    r32.push(r64[0][index] );
    console.log(r64[0]);
    console.log(r32[0]);
    // clickup( 포켓몬목록['r64'][index][2] )
//    게임시작() ; // r2 일때는 전체종료 --->
}

//function 게임시작() {
//
//    //1 . 포켓몬 출력
//    //2 . 이상형 월드컵 진행
//        //1. 리스트 를 받아와서 2명만 출력 후 선택
//        //2. 선택받은 포켓몬은 다음강 리스트에 추가 및 현재 리스트에서 삭제
//        //3. 탈락한 포켓몬은 현재리스트에서 삭제
//        //4. 화면 새로고침
//        //5.
//    // ---- 2. 임의의 포켓몬 띄우기 , 현재 목록에 존재하는 포켓몬 중에서 2마리
//    r1 = 1
//    r2 = 2
//
//    if (r64[0].length == 64){r1 = Math.floor(Math.random() * 32);
//    r2 = Math.floor(Math.random() * 32)+32;}
//    else if (r32[0].length == 32){r1 = Math.floor(Math.random() * 16);
//    r2 = Math.floor(Math.random() * 16)+16;}
//    else if (r16[0].length == 16){r1 = Math.floor(Math.random() * 8);
//    r2 = Math.floor(Math.random() * 8)+8;}
//    else if (r8[0].length == 8){r1 = Math.floor(Math.random() * 4);
//    r2 = Math.floor(Math.random() * 4)+4;}
//    else if (r4[0].length == 4){r1 = Math.floor(Math.random() * 2);
//    r2 = Math.floor(Math.random() * 2)+2;}
//
//
//    //중복 숫자 제거
////    if (r1 == r2) {
////        r2 = Math.floor(Math.random() * r64[0].length );
////        return;
////    }
////
////    if(r2 == r1) {
////        r1 = Math.floor(Math.random() * r64[0].length );
////    }
//
//    포켓몬출력하기( r1 , r2 );
//
//}
//
//function 포켓몬출력하기( index1 , index2  ){
//
//        console.log(index1)
//        console.log(index2)
//
//        let newInnerList = [];
//        let innerList1 = [];
//
//        if(r64[0].length == 64){ innerList1 = r64[0];}
//        else if(r32[0].length == 32){ innerList1 = r32[0];}
//        else if(r16[0].length == 16){ innerList1 = r16[0];}
//        else if(r8[0].length == 8){ innerList1 = r8[0];}
//        else if(r4[0].length == 4){ innerList1 = r4[0];}
////
////        for(let item of innerList1){
////            if(item.has(index1)){
////                r32.push(item);
////            }
////            else {
////                newInnerList.push(item);
////            }
////        }
//
////        console.log(innerList)
//            //어디에
//        let ch1 = document.querySelector('.ch1');
//        let ch2 = document.querySelector('.ch2');
//
//        num1 = r64[0][index1][2]
//        num2 = r64[0][index2][2]
//
//        html = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num1}.png" onclick="포켓몬선택(${ index1 } )"> </td> </tr>`
//        html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num2}.png" onclick="포켓몬선택(${ index2 } )"> </td> </tr>` //-1?
//
//        //출력
//        ch1.innerHTML = html
//        ch2.innerHTML = html2
//
//        r64[0].splice( index1 , 1  );
//        r64[0].splice( index2 , 1  );
//
//}

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
            if(r.length == 64){r64.push(r); R64();}
            else if(r.length == 32){r32.push(r);}
            else if(r.length == 16){r16.push(r);}
            else if(r.length == 8){r8.push(r);}
            else if(r.length == 4){r4.push(r);}

        }
    })
//게임시작() ;
}

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

function R64(){

    let object = r64.flat();
    console.log(object)

    let half = Math.ceil(object.length / 2);
    console.log(half)

    let firsthalf = object.slice(0, half);
    console.log(firsthalf)

    let secondhalf = object.slice(half);
    console.log(secondhalf)

    let r64 = [firsthalf, secondhalf];
    console.log(r64)

//    let r1 = 0;
//    let r2 = 0;
//
//    r1 = Math.floor(Math.random() * 32);
//    r2 = Math.floor(Math.random() * 32)+32;
//
//    console.log(r1)
//    console.log(r2)
//
//    let ch1 = document.querySelector('.ch1');
//    let ch2 = document.querySelector('.ch2');
//
//    console.log(r64)
//    console.log(r64[0][r1])
//    console.log(r64[0][r2])
//
//    html = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${r1}}.png" onclick="포켓몬선택(${ r1 } )"> </td> </tr>`
//    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${r2}}.png" onclick="포켓몬선택(${ r2 } )"> </td> </tr>`
//
////            //출력
//    ch1.innerHTML = html
//    ch2.innerHTML = html2

//
//     html = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num1}.png" onclick="포켓몬선택(${ index1 } )"> </td> </tr>`
//     html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num2}.png" onclick="포켓몬선택(${ index2 } )"> </td> </tr>` //-1?


}