
포켓몬목록 = {
    r64 : [],
    r32 : [],
    r16 : [],
    r8 : [],
    r4 : [],
    r2 : [],
    win : []
}

//////////////////////////////////////////////////////////////
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
            if(r.length == 64){포켓몬목록['r64'].push(r); }
            else if(r.length == 32){포켓몬목록['r32'].push(r);}
            else if(r.length == 16){포켓몬목록['r16'].push(r);}
            else if(r.length == 8){포켓몬목록['r8'].push(r);}
            else if(r.length == 4){포켓몬목록['r4'].push(r);}
//            console.log(포켓몬목록['r64'])
//            console.log(포켓몬목록['r32'])
//            console.log(포켓몬목록['r16'])
//            console.log(포켓몬목록['r8'])
//            console.log(포켓몬목록['r4'])
        }
    })
게임시작()
}

/////////////////////////////////////////////////////////////////////////
function 게임시작(){
//    console.log(포켓몬목록['r64'])
    if(포켓몬목록['win'].length < 1){
        if(포켓몬목록['r64'].length > 0){round64();}
        else if (포켓몬목록['r64'].length == 0 && 포켓몬목록['r32'].length > 0){round32();}
        else if (포켓몬목록['r32'].length == 0 && 포켓몬목록['r16'].length > 0){round16();}
        else if (포켓몬목록['r16'].length == 0 && 포켓몬목록['r8'].length > 0){round8();}
        else if (포켓몬목록['r8'].length == 0 && 포켓몬목록['r4'].length > 0){round4();}
        else if (포켓몬목록['r4'].length == 0 && 포켓몬목록['r2'].length > 0){round2();}
        else if (포켓몬목록['r2'].length == 0 && 포켓몬목록['win'].length > 0){win();}
    }
}
/////////////////////////
function round64(){
//    console.log(포켓몬목록['r64'][0])

    num1 = Math.floor(Math.random() * 포켓몬목록['r64'][0].length);
    num2 = Math.floor(Math.random() * 포켓몬목록['r64'][0].length);

    if (num1 === num2){
        num2 = Math.floor(Math.random() * 포켓몬목록['r64'][0].length);
        return
    }

    console.log(num1, num2);

    let ch1 = document.querySelector('.ch1');
    let ch2 = document.querySelector('.ch2');
    let tround = document.querySelector('.tround');

    con1 = 포켓몬목록['r64'][0][num1][2]
    con2 = 포켓몬목록['r64'][0][num2][2]

    html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택64(${ num1 },${ num2 } )"> </td> </tr>`
    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택64(${ num2 },${ num1 } )"> </td> </tr>`
    html3 = `<tr> <td> 64강/${포켓몬목록['r64'][0].length} </td> </tr>`

    ch1.innerHTML = html1
    ch2.innerHTML = html2
    tround.innerHTML = html3

    if(포켓몬목록['r64'][0].length == 0){round32();}
//    포켓몬목록['r64'].push(chunkedArrays)

}
/////////////////////////////////////////////
function round32(){

    num1 = Math.floor(Math.random() * 포켓몬목록['r32'][0].length);
    num2 = Math.floor(Math.random() * 포켓몬목록['r32'][0].length);

    if (num1 === num2){
        num2 = Math.floor(Math.random() * 포켓몬목록['r32'][0].length);
        return
    }

    console.log(num1, num2);

    let ch1 = document.querySelector('.ch1');
    let ch2 = document.querySelector('.ch2');
    let tround = document.querySelector('.tround');

    con1 = 포켓몬목록['r32'][0][num1][2]
    con2 = 포켓몬목록['r32'][0][num2][2]

    html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택32(${ num1 },${ num2 } )"> </td> </tr>`
    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택32(${ num2 },${ num1 } )"> </td> </tr>`
    html3 = `<tr> <td> 32강/${포켓몬목록['r32'][0].length} </td> </tr>`

    ch1.innerHTML = html1
    ch2.innerHTML = html2
    tround.innerHTML = html3

    if(포켓몬목록['r32'][0].length == 0){round16();}
}
///////////////////////////////////////////////////////////////////////////////////////////////
function round16(){

    num1 = Math.floor(Math.random() * 포켓몬목록['r16'][0].length);
    num2 = Math.floor(Math.random() * 포켓몬목록['r16'][0].length);

    if (num1 === num2){
        num2 = Math.floor(Math.random() * 포켓몬목록['r16'][0].length);
        return
    }

    console.log(num1, num2);

    let ch1 = document.querySelector('.ch1');
    let ch2 = document.querySelector('.ch2');
    let tround = document.querySelector('.tround');

    con1 = 포켓몬목록['r16'][0][num1][2]
    con2 = 포켓몬목록['r16'][0][num2][2]

    html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택16(${ num1 },${ num2 } )"> </td> </tr>`
    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택16(${ num2 },${ num1 } )"> </td> </tr>`
    html3 = `<tr> <td> 16강/${포켓몬목록['r16'][0].length} </td> </tr>`

    ch1.innerHTML = html1
    ch2.innerHTML = html2
    tround.innerHTML = html3

    if(포켓몬목록['r16'][0].length == 0){round8();}
}
//////////////////////////////////////////////////////////////////////////////////////
function round8(){

    num1 = Math.floor(Math.random() * 포켓몬목록['r8'][0].length);
    num2 = Math.floor(Math.random() * 포켓몬목록['r8'][0].length);

    if (num1 === num2){
        num2 = Math.floor(Math.random() * 포켓몬목록['r8'][0].length);
        return
    }

    console.log(num1, num2);

    let ch1 = document.querySelector('.ch1');
    let ch2 = document.querySelector('.ch2');
    let tround = document.querySelector('.tround');

    con1 = 포켓몬목록['r8'][0][num1][2]
    con2 = 포켓몬목록['r8'][0][num2][2]

    html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택8(${ num1 },${ num2 } )"> </td> </tr>`
    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택8(${ num2 },${ num1 }  )"> </td> </tr>`
    html3 = `<tr> <td> 8강/${포켓몬목록['r8'][0].length} </td> </tr>`;

    ch1.innerHTML = html1
    ch2.innerHTML = html2
    tround.innerHTML = html3

    if(포켓몬목록['r8'][0].length == 0){round4();}
}
///////////////////////////////////////////////////////////////////////////////////////////
function round4(){

    num1 = Math.floor(Math.random() * 포켓몬목록['r4'][0].length);
    num2 = Math.floor(Math.random() * 포켓몬목록['r4'][0].length);

    if (num1 === num2){
        num2 = Math.floor(Math.random() * 포켓몬목록['r4'][0].length);
        return
    }

    console.log(num1, num2);

    let ch1 = document.querySelector('.ch1');
    let ch2 = document.querySelector('.ch2');
    let tround = document.querySelector('.tround');

    con1 = 포켓몬목록['r4'][0][num1][2]
    con2 = 포켓몬목록['r4'][0][num2][2]

    html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택4(${ num1 },${ num2 } )"> </td> </tr>`
    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택4(${ num2 },${ num1 } )"> </td> </tr>`
    html3 = `<tr> <td> 4강/${포켓몬목록['r4'][0].length} </td> </tr>`

    ch1.innerHTML = html1
    ch2.innerHTML = html2
    tround.innerHTML = html3

    if(포켓몬목록['r4'][0].length == 0){round2();}
}
///////////////////////////////////////////////////////////////////////////////////////////
function round2(){

    num1 = Math.floor(Math.random() * 포켓몬목록['r2'][0].length);
    num2 = Math.floor(Math.random() * 포켓몬목록['r2'][0].length);

    if (num1 === num2){
        num2 = Math.floor(Math.random() * 포켓몬목록['r2'][0].length);
        return
    }

    console.log(num1, num2);

    let ch1 = document.querySelector('.ch1');
    let ch2 = document.querySelector('.ch2');
    let tround = document.querySelector('.tround');

    con1 = 포켓몬목록['r2'][0][num1][2]
    con2 = 포켓몬목록['r2'][0][num2][2]

    html1 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png" onclick="포켓몬선택2(${ num1 },${ num2 } )"> </td> </tr>`
    html2 = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con2}.png" onclick="포켓몬선택2(${ num2 },${ num1 } )"> </td> </tr>`
    html3 = `<tr> <td> 2강/${포켓몬목록['r2'][0].length} </td> </tr>`

    ch1.innerHTML = html1
    ch2.innerHTML = html2
    tround.innerHTML = html3

    if(포켓몬목록['r2'][0].length == 0){win();}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function win (){

    let tnmtTbody = document.querySelector('.tnmtTbody');

    html = `<tr> <td> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${con1}.png")"> </td> </tr>`

    tnmtTbody.innerHTML = html;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function 포켓몬선택64(index, index2){

    console.log(index, index2)
    포켓몬목록['r32'].push(포켓몬목록['r64'][0][index])
    console.log(포켓몬목록['r32'])

    if(index > index2){
        포켓몬목록['r64'][0].splice(index, 1);
        포켓몬목록['r64'][0].splice(index2, 1);
    }
    else if (index < index2){
        포켓몬목록['r64'][0].splice(index2, 1);
        포켓몬목록['r64'][0].splice(index, 1);
    }

    console.log(포켓몬목록['r64'][0])
    if(포켓몬목록['r64'][0].length > 0){게임시작();}
    else if(포켓몬목록['r64'][0].length == 0){round32();}
}
//////////////////////////////////////////////////
function 포켓몬선택32(index, index2){

    console.log(index, index2)
    포켓몬목록['r16'].push(포켓몬목록['r32'][0][index])
    console.log(포켓몬목록['r16'])

    if(index > index2){
        포켓몬목록['r32'][0].splice(index, 1);
        포켓몬목록['r32'][0].splice(index2, 1);
    }
    else if (index < index2){
        포켓몬목록['r32'][0].splice(index2, 1);
        포켓몬목록['r32'][0].splice(index, 1);
    }

    게임시작();
}
//////////////////////////////////////////////////
function 포켓몬선택16(index, index2){

    console.log(index, index2)
    포켓몬목록['r8'].push(포켓몬목록['r16'][0][index])
    console.log(포켓몬목록['r8'])

    if(index > index2){
        포켓몬목록['r16'][0].splice(index, 1);
        포켓몬목록['r16'][0].splice(index2, 1);
    }
    else if (index < index2){
        포켓몬목록['r16'][0].splice(index2, 1);
        포켓몬목록['r16'][0].splice(index, 1);
    }

    게임시작();
}
//////////////////////////////////////////////////
function 포켓몬선택8(index, index2){

    console.log(index, index2)
    포켓몬목록['r4'].push(포켓몬목록['r8'][0][index])
    console.log(포켓몬목록['r4'])

    if(index > index2){
        포켓몬목록['r8'][0].splice(index, 1);
        포켓몬목록['r8'][0].splice(index2, 1);
    }
    else if (index < index2){
        포켓몬목록['r8'][0].splice(index2, 1);
        포켓몬목록['r8'][0].splice(index, 1);
    }

    게임시작();
}
//////////////////////////////////////////////////
function 포켓몬선택4(index, index2){

    console.log(index, index2)
    포켓몬목록['r2'].push(포켓몬목록['r4'][0][index])
    console.log(포켓몬목록['r2'])

    if(index > index2){
        포켓몬목록['r4'][0].splice(index, 1);
        포켓몬목록['r4'][0].splice(index2, 1);
    }
    else if (index < index2){
        포켓몬목록['r4'][0].splice(index2, 1);
        포켓몬목록['r4'][0].splice(index, 1);
    }

    게임시작();
}
//////////////////////////////////////////////////
function 포켓몬선택2(index, index2){

    console.log(index, index2)
    포켓몬목록['win'].push(포켓몬목록['r2'][0][index])
    console.log(포켓몬목록['win'])

    if(index > index2){
        포켓몬목록['r2'][0].splice(index, 1);
        포켓몬목록['r2'][0].splice(index2, 1);
    }
    else if (index < index2){
        포켓몬목록['r2'][0].splice(index2, 1);
        포켓몬목록['r2'][0].splice(index, 1);
    }

    게임시작();
}
//////////////////////////////////////////////////
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
