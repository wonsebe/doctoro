
포켓몬목록 = {
    r64 : [],
    r32 : [],
    r16 : [],
    r8 : [],
    r4 : [],
    r2 : [],
}

강목록 = [ 'r64' , 'r32', 'r16', 'r8', 'r4'  ]

function 포켓몬선택( index ){

    포켓몬목록['r32'].push( 포켓몬목록['r64'][index] );
    console.log( 포켓몬목록['r64'] );
    console.log( 포켓몬목록['r32'] );
    // clickup( 포켓몬목록['r64'][index][2] )
    게임시작() ; // r2 일때는 전체종료 --->
}

function 게임시작() {


    // ---- 2. 임의의 포켓몬 띄우기 , 현재 목록에 존재하는 포켓몬 중에서 2마리
    r1 = Math.floor(Math.random() * 포켓몬목록['r64'].length );
    r2 = Math.floor(Math.random() * 포켓몬목록['r64'].length );

    포켓몬출력하기( r1 , r2 );

}

function 포켓몬출력하기( index1 , index2  ){

            //어디에
        let ch1 = document.querySelector('.ch1');
        let ch2 = document.querySelector('.ch2');


        html = `<tr> <td> <img src="${ 포켓몬목록['r64'][index1][1] }" onclick="포켓몬선택(${ index1 } )"> </td> </tr>`
        html2 = `<tr> <td> <img src="${ 포켓몬목록['r64'][index2][1] }" onclick="포켓몬선택(${ index2 } )"> </td> </tr>`

        //출력
        ch1.innerHTML = html
        ch2.innerHTML = html2

        포켓몬목록['r64'].splice( index1 , 1  );
        포켓몬목록['r64'].splice( index2 , 1  );

        console.log( 포켓몬목록 )

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
            console.log(r);
            //r.이미지,이름,아이디 가져와서 랜덤으로 띄우고 빼고 리스트에 반복시켜서 만들기
            // --- 1. 16(32) 8(16) 4(8)
            포켓몬목록['r64'] = r;


    //        r.splice(2)
    //        console.log(r);
    //        r.forEach(e => {
    //            console.log(e)
    //
    //            html = `<tr>
    //                    <td> <img src=${e[1]} onclick="clickup(${e[2]})"> </td>
    //                    </tr>`
    //        })

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
