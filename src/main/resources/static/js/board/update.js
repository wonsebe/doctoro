console.log('update.js');
let urlParams = new URL(location.href).searchParams;
let bno = urlParams.get("bno") // 현재 URL 경로상의 bno 값 호출
let id = urlParams.get("id") // 현재 URL 경로상의 bno 값 호출

// 1. 로그인 체크
doLoginCheck();
function doLoginCheck() {   console.log('doLoginCheck');
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result);
            if (result == '') {                 // 비로그인 상태인 경우
                alert("로그인 후 이용 가능합니다.");
                location.href="/user/login";    // 로그인 페이지로 이동
            }
        }   // success end
    })  // ajax end
}   // doLoginCheck() end

//수정
function updateB(){
    let btitle=document.querySelector('#btitle').value;
    let bcontent=document.querySelector('#bcontent').value;
    let categoryno=document.querySelector('#categoryno').value;
    
    let info={btitle:btitle, bcontent: bcontent, categoryno:categoryno,bno:bno}

    
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result);
            if (result.id == 'admin' || result.id == id ) {   
            $.ajax({
                url:'/board/update',
                method:'put',
                data:info,
                success: (result) =>{
                    console.log(result);
                    console.log('수정');
                    if(result){
                        alert('수정성공');
                        location.href='/board/bprint'
                        
                    }else{
                        alert('수정 실패');

                    }
                },
                error : (e) =>{
                    console.log(e);
            }
            });
        }else{
           alert('글쓴 사람만 수정가능합니다.');
           location.href="/board/bprint";
        }


    }

    })
    
    
}



// 3. 썸머노트 실행
$(document).ready(function() {
    // - 썸머노트 옵션
    let option = {
        height : 500 , // 에디터 높이
        lang : 'ko-KR' // 도움말이 한글로 표기
    }
  $('#summernote').summernote( option );
});