
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
    r32.push(r64[0][index] );
    console.log(r64);
    console.log(r32);
    // clickup( 포켓몬목록['r64'][index][2] )
    게임시작() ; // r2 일때는 전체종료 --->
}

function 게임시작() {

//    console.log(포켓몬목록['r64'])
    // ---- 2. 임의의 포켓몬 띄우기 , 현재 목록에 존재하는 포켓몬 중에서 2마리
    console.log(r64)
    console.log(r64[0].length)

    r1 = Math.floor(Math.random() * r64[0].length );
    r2 = Math.floor(Math.random() * r64[0].length );

    //중복 숫자 제거
    if (r1 == r2) {
        r2 = Math.floor(Math.random() * r64[0].length );
        return;
    }

    if(r2 == r1) {
        r1 = Math.floor(Math.random() * r64[0].length );
    }

    포켓몬출력하기( r1 , r2 );

}

function 포켓몬출력하기( index1 , index2  ){

            //어디에
        let ch1 = document.querySelector('.ch1');
        let ch2 = document.querySelector('.ch2');

        console.log(index1)
        console.log(index2)

//        console.log(typeof(index1))
//        console.log(typeof(index2)) //number type

        console.log(r64)
        console.log(r64[0][index1])
//        console.log(포켓몬목록['r64'][index1])
//        console.log(포켓몬목록['r64'][index1][2] )
//        console.log(포켓몬목록['r64'][index1][1] )
//        url = 포켓몬목록['r64'][index1][1] //이미지와 선택되는 포켓몬이 다르게나옴
//        console.log(포켓몬목록['r64'][index2][2] )
//        for(i=0;i<포켓몬목록['r64'].length;i++){
//            if(포켓몬목록['r64'][index1] == i)
//            {break;}
//            else if(포켓몬목록['r64'][index1] != i)
//            {index1 = i; break;}
//        }

        html = `<tr> <td> <img src="${ r64[0][index1][1] }" onclick="포켓몬선택(${ index1 } )"> </td> </tr>`
        html2 = `<tr> <td> <img src="${ r64[0][index2][1] }" onclick="포켓몬선택(${ index2 } )"> </td> </tr>` //-1?

        //출력
        ch1.innerHTML = html
        ch2.innerHTML = html2

        r64[0].splice( index1 , 1  );
        r64[0].splice( index2 , 1  );

}

function selectround(){
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
            if(r.length == 64){r64.push(r);}
            else if(r.length == 32){r32.push(r);}
            else if(r.length == 16){r16.push(r);}
            else if(r.length == 8){r8.push(r);}
            else if(r.length == 4){r4.push(r);}
//            목록.push(r);

        }
    })
게임시작() ;
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

function flatten3DArrayWithFlat(arr) {
    return arr.flat(2); // 3차원 배열을 2차원 배열로 평탄화
}