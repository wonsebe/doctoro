console.log('product.js');

// 페이지 정보들을 관리하는 객체 , 전역변수 , 함수의 매개변수
let pageInfo = {
    page : 1,
    pcategory_no : 0,
    pSearchKey : 'pSearchSelect',
    pSearchKeyWord : ''
}

/*
    1. page           : 현재 페이지    [기본값 1페이지]
    2. pcategory_no    : 현재 카테고리  [기본값 0 전체보기]
    3. pSearchKey     : 현재 검색 필드 [기본값 : 제목필드]
    4. pSearchKeyWord : 현재 검색값    [기본값 : 공백]
*/

// 상품 전체 출력
productAllPrint(1);
function productAllPrint(page) {    console.log('productAllPrint()');
    pageInfo.page = page;       //현재 페이지 번호를 전역변수에 대입
    pCategoryPrint();           // 카테고리 출력
    let productPageDto;
    
    $.ajax({
        async : false,
        method : 'get',
        url : '/product/all/print',
        data : pageInfo,
        success : (result) => {     console.log(result);
            productPageDto = result;
        }   // success end
    })  // ajax end

    let productAll = document.querySelector('#productAll');
    let html = ``;
    let list = productPageDto.productData;
    console.log(list);

    Array.from(list).forEach(상품 => {
        let pFolderName = '';

        // 해당 상품의 이미지가 저장돼있는 카테고리 폴더명 구하기
        if (상품.pcategory_name == '굿즈') {
            pFolderName = 'goods';
        } else if (상품.pcategory_name == '카드') {
            pFolderName = 'card';
        } else if (상품.pcategory_name == '강화 아이템') {
            pFolderName = 'item';
        }

        html += `
                <div>
                    <div>
                        <a href="/product/detail?pno=${상품.product_no}">
                            <img id="productImg" src="/img/${pFolderName}/${상품.product_image}" />
                        </a>
                    </div>
                    <div> <a href="/product/detail?pno=${상품.product_no}">${상품.product_name}</a> </div>
                    <div>${상품.product_description}</div>
                    <div>${상품.price}</div>
                    <div>${상품.pcategory_name}</div>
                </div>
                `

        productAll.innerHTML = html;
    })  // forEach end

    // 페이지네이션 (페이지 버튼) 구성
    // 어디에
    let pagination = document.querySelector('.pagination')

    // 무엇을
    let pageHTML=``;
    
    // 이전버튼, page : 현재 함수의 매개변수이면서 현재 페이지번호 의미, 현재 페이지 -1, 만약에 현재 페이지 -1 했을 때 1보다 작으면 1고정하고 아니면 -1 차감
    pageHTML += `
                <li class="page-item">
                    <a class="page-link" onclick="productAllPrint(${ page - 1 < 1 ? 1 : page-1 })">이전</a>
                </li>
                `
    
    // 페이지 버튼
    // 페이지마다 시작 버튼 번호 : startBtn
    let startBtn = productPageDto.startBtn;

    // 페이지마다 끝 버튼 번호 : endBtn
    let endBtn = productPageDto.endBtn;

    // 최대 페이지수 : totalPage
    let totalPage = productPageDto.totalPage;

    for( let current = startBtn ; current <= endBtn ; current++ ){
        pageHTML += `<li class="page-item"> <a class="page-link ${current == page ? 'active' : ''}" onclick="productAllPrint(${current})">${current}</a></li>`;
    }

    // 다음버튼 , page : 현재 함수의 매개변수 이면서 현재 페이지 번호 의미 , 현재페이지 + 1 , 만약에 현재 페이지+1 했을 때 최대 페이지 수 보다 커지면 최대 페이지 수 고정 아니면 +1 증가
    pageHTML += `<li class="page-item">
                    <a class="page-link" onclick="productAllPrint(${ page + 1 > totalPage ? totalPage : page+1 } )">다음</a>
                 </li>`;

    // 출력
    pagination.innerHTML = pageHTML;

}   // productAllPrint() end

// 상품 카테고리 출력
function pCategoryPrint() {    console.log('pCategoryPrint()');
    let productCategory = document.querySelector('#productCategory');
    let html = `
               <li onclick="onCategory(0)">전체보기</li>
               `;

    $.ajax({
        async : false,
        method : 'get',
        url : '/product/category/print',
        success : (result) => {     console.log(result);
            result.forEach(상품카테고리 => {
                html += `
                        <li onclick="onCategory(${상품카테고리.pcategory_no})">${상품카테고리.pcategory_name}</li>
                        `
            })  // forEach end
        }   // success end
    })  // ajax end

    productCategory.innerHTML = html;
}   // pCategoryPrint() end



// 검색 상태 제거/초기화
function onSearchClear(){
    // 입력창 초기화
    document.querySelector('.pSearchKey').value=`pSearchSelect`
    document.querySelector('.pSearchKeyWord').value=``;

    // 전역변수 초기화
    pageInfo.pSearchKey='pSearchSelect';
    pageInfo.pSearchKeyWord='';
}

// 상품 카테고리 클릭 시
function onCategory(pcategory_no) {
    onSearchClear();        //검색 제거

    // 전역변수에 pcategory_no 대입
    pageInfo.pcategory_no = pcategory_no;

    console.log('카테고리 변경'); 
    console.log(pageInfo);

    productAllPrint(1);      // 새로 고침, 1페이지
}

//2. 검색 버튼 클릭 했을 때
function search(){
    // 입력
    let pSearchKey = document.querySelector('.pSearchKey').value;
    let pSearchKeyWord = document.querySelector('.pSearchKeyWord').value;

    // 전역변수에 대입
    pageInfo.pSearchKey = pSearchKey;
    pageInfo.pSearchKeyWord = pSearchKeyWord;

    // 새로고침, 1페이지
    productAllPrint(1);
}




