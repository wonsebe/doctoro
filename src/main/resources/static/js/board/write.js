console.log('write.js');

category();
function category(){
   
    
    $.ajax({
        async:false,
        url:"/board/bcategory",
        method:'get',
        success:(result)=>{
            console.log(result);
            //어디에
            let categoryBox=document.querySelector('.categoryBox')
            //무엇을
            let html=''
           result.forEach(카테고리 =>{
            html+= `
            <option value="${카테고리.categoryno}">${카테고리.categoryname}</option>
            `
           })
      //출력
      categoryBox.innerHTML=html;
      console.log(categoryBox);
        }

    })

}

function boardWrite(){
    let categoryno=document.querySelector('.categoryBox').value;
    let btitle=document.querySelector('#btitle').value;
    let bcontent=document.querySelector('.bcontent').value;
    // 2. 객체화
    let info = {categoryno : categoryno ,
                btitle : btitle ,
                bcontent : bcontent
            }
    console.log( info );

    let html='';
    console.log(html)

    $.ajax({
        async:false,
        url:'/board/write',
        method:'post',
        data : info,
        success: (result) =>{
            console.log(result);
            if( result ){ // 4. 통신 결과에 실행문
                alert('글쓰기성공');
                location.href="/board/bprint";
            }else{ alert('글쓰기실패'); }
        } , //s e
        error : (e)=>{ console.log(e); }
    })//ajax e

}//f e

// 3. 썸머노트 실행
$(document).ready(function() {
    // - 썸머노트 옵션
    let option = {
        height : 500 , // 에디터 높이
        lang : 'ko-KR' // 도움말이 한글로 표기
    }
  $('#summernote').summernote( option );
});