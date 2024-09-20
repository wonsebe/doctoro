console.log('board.js');
// //페이지 정보들을 관리하는 객체 , 전역변수 , 함수의 매개변수
let pageInfo={ page:1, categoryno:0 , searchKey:'btitle',searchKeyWord:'' }
//  // 1. page : 현재페이지[기본값 1페이지] , 2.categoryno : 현재카테고리[기본값 0전체보기] // 3.searchKey:현재검색필드[기본값:제목필드] 4.searchKeyword:현재검색값[기본값:공백]

// 검색 상태 제거/초기화
function onSearchClear(){
    //1. 입력창 초기화
    document.querySelector('.searchKey').value=`btitle`
    document.querySelector('.searchKeyWord').value=``;
    //2. 전역변수 초기화
    pageInfo.searchKey='btitle';
    pageInfo.searchKeyWord='';
}

// 1. 로그인 체크
function doLoginCheck() {   console.log('doLoginCheck');
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result);
            if (result == '') {                 // 비로그인 상태인 경우
                alert("로그인 후 이용 가능합니다.");
                location.href="/user/login";    // 로그인 페이지로 이동
            } else {
                location.href =  "/board/bwrite"
            }
        }   // success end
    })  // ajax end
}   // doLoginCheck() end



 //카테고리 클릭 했을 때
function onCategory(categoryno){
    onSearchClear(); //검색 제거
    //1. 전역변수에 categoryno 대입
    pageInfo.categoryno=categoryno; 
    console.log('카테고리 변경'); 
    console.log(pageInfo);
    print(1) ; //새로 고침, 1페이지
    
}


//카테고리 출력
 function category(){
       //어디에
       let categoryBox=document.querySelector('.categoryBox')
       //무엇을
       let html=`<div class="${pageInfo.categoryno==0 ? 'categoryActive': ''}"
                  style="width:150px" onclick="onCategory(0)">전체보기 </div>`
    
     
     $.ajax({
         async:false,
         url:"/board/bcategory",
         method:'get',
         success:result=>{
             console.log(result);
          
            result.forEach(카테고리 =>{
             html+= `<div class="${pageInfo.categoryno==카테고리.categoryno ? 'categoryActive' : ''}" style="width:100px"
                    onclick="onCategory( ${카테고리.categoryno})"> ${카테고리.categoryname} </div>
             `
            })
        }
    })
 //출력
 categoryBox.innerHTML=html;
 console.log(categoryBox);
      
}
 
     
 




//2. 검색 버튼 클릭 했을 때
function search(){
    //1. 입력
    let searchKey=document.querySelector('.searchKey').value;
    let searchKeyWord=document.querySelector('.searchKeyWord').value;

    //전역변수에 대입
    pageInfo.searchKey=searchKey;
    pageInfo.searchKeyWord=searchKeyWord;
    //3.새로고침, 1페이지
    print(1)

}


//1. 게시판 조회
 // 매개변수:  page : 보고자 하는 현재 페이지번호 , 초기값 : 1 , 첫페이지를 1페이지로 하기 위해서

print(1);
function print(page){

    pageInfo.page=page; //현재 페이지 번호를 전역변수에 대입
    category(); //카테고리 호출
    let boardPageDto={} // ajax로부터 응답받은 객체를 저장하는 변수

    $.ajax({
        async:false,
        url: "/board/print",
        method:"get",
        data:pageInfo, //전역변수 보내기
        success: r =>{ console.log(r);
            boardPageDto=r;
        },
        error : (e) =>{
            console.log(e);
      }
    })//ajax e
        let tbox= document.querySelector('#tbox');
        let html=''
            let list=boardPageDto.data;
            console.log(boardPageDto);
            console.log(list)
            Array.from(list).forEach(게시판 =>{
            console.log(게시판.bno)
                html+=` 
                        <tr>
                        <th> ${게시판.bno} </th> 
                        <th> <a href="/board/detail?bno=${게시판.bno}">${게시판.btitle}</a></th>
                        <th> ${게시판.bdate} </th> 
                        <th> ${ 게시판.bview }</th>
                        </tr>`
            });
            tbox.innerHTML=html;
            console.log(tbox);


     //4. 페이지네이션 ( 페이지 버튼 ) 구성
        //4-1 어디에
        let pagination=document.querySelector('.pagination')

        // //4-2 무엇을
        let pageHTML=``;
        //     //이전버튼, page : 현재 함수의 매개변수이면서 현재 페이지번호 의미, 현재페이지 -1, 만약에 현재페이지 -1했을때 1보다 작으면 1고정하고 아니면 -1 차감
            pageHTML+=`<li class="page-item"><a class="page-link" onclick="print( ${ page-1 < 1 ? 1 : page-1 } )">이전</a></li>`
        // //페이지 버튼
            //페이지마다 시작 버튼 번호 : startBtn
            let startBtn=boardPageDto.startBtn;
            //페이지마다 끝 버튼 번호 : endBtn
            let endBtn=boardPageDto.endBtn;
            //최대 페이지수 : totalPage
            let totalPage = boardPageDto.totalPage;

        for( let current = startBtn ; current <= endBtn ; current++ ){
            pageHTML += `<li class="page-item"><a class="page-link ${current == page ? 'active' : ''}" onclick="print(${current})">${current}</a></li>`;
        }
        // 다음버튼 , page : 현재 함수의 매개변수 이면서 현재페이지번호 의미 , 현재페이지 + 1 , 만약에 현재페이지+1 했을때 최대페이지수 보다 커지면 최대페이지수 고정 아니면 +1 증가
        pageHTML += `<li class="page-item">
                        <a class="page-link" onclick="print( ${ page+1 > totalPage ? totalPage : page+1 } )">다음</a></li>`;

    // 4-3 출력
    pagination.innerHTML = pageHTML;
}//m e
