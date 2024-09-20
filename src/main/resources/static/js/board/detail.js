console.log('detail.js');



let bno = new URL( location.href ).searchParams.get('bno'); // 현재 URL 경로상의 bno 값 호출
console.log( bno );
// 1. 개별 게시물 출력 , 매개변수는 현재 게시물의 번호
detailB( bno )
function detailB( bno ){
    let board = {}
    $.ajax({
     async : false,
     method : 'get',
     url : '/user/login/check',
     success : (result) => {     console.log(result);
         if (result == '') {                 // 비로그인 상태인 경우
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
         } else {
          $.ajax({ // AJAX
               async : false ,
               url :"/board/bdetail",
               method : "get" ,
               data : { bno : bno } ,
               success : r => { console.log(r); board = r} // 응답 받은 데이터을 ajax 밖 변수에 대입
          }) // a e
                  detailB1(bno,board.id)
         }
     }   // success end
 })  // ajax end
    
}//f e


function detailB1( bno, id ){
    let board = {}
    $.ajax({
     async : false,
     method : 'get',
     url : '/user/login/check',
     success : (result) => {     console.log(result);
         if (result.id == 'admin' || result.id == id ) {                 // 비로그인 상태인 경우
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
                  <button type="button" onclick="location.href='/board/bupdate?bno=${bno}&id=${id}'">수정</button>
                  <button type="button" onclick="deleteB(${bno})">삭제</button>
                  `;
         } else {
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
          
                  
         }
     }   // success end
 })  // ajax end
    
}//f e

