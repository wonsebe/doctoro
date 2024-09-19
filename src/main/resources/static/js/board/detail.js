console.log('detail.js');



let bno = new URL( location.href ).searchParams.get('bno'); // 현재 URL 경로상의 bno 값 호출
console.log( bno );
// 1. 개별 게시물 출력 , 매개변수는 현재 게시물의 번호
detailB( bno )
function detailB( bno ){
    let board = {}
    $.ajax({ // AJAX
         async : false ,
         url :"/board/bdetail",
         method : "get" ,
         data : { bno : bno } ,
         success : r => { console.log(r); board = r} // 응답 받은 데이터을 ajax 밖 변수에 대입
    }) // a e
    document.querySelector('.categoryname').innerHTML = `${ board.categoryname }`; console.log(board.categoryname);
    document.querySelector('.infoBox').innerHTML = `${ board.id } / ${ board.bview } / ${ board.bdate }`;
    document.querySelector('.btitle').innerHTML = `${ board.btitle }`;
    document.querySelector('.bcontent').innerHTML = `${ board.bcontent }`;
    document.querySelector('.btnBox').innerHTML =
            `
            <button type="button" onclick="location.href='/board/bupdate?bno=${bno}'">수정</button>
            <button type="button" onclick="deleteB(${bno})">삭제</button>
            `;
}//f e


