console.log('boardCount.js');
function count(){
$.ajax({
    async : false ,
    url:'/board/wordCount',
    method:'get',
    success: (response) => {
        let bCount=[]
        response.forEach(item => {
           
            console.log(bCount);
            console.log(item.btitle);   // 각 게시물의 btitle 출력
            console.log(item.bcontent);  // 각 게시물의 bcontent 출력
            let post = {
                btitle: item.btitle,
                bcontent: item.bcontent
            };
            bCount.push(post); // 배열에 추가

        })
        $.ajax({
            url:'http://127.0.0.1:5000/board/wordCount',
            method:'post',
            contentType: 'application/json',
            data: JSON.stringify(bCount), // JSON 형식으로 변환
            success : r => { console.log(r);
                let countPrint=document.querySelector('#countPrint')
                let html=''
                r.forEach( 숫자 => {
                    html += `<tr> <th> ${숫자.btitle} </th>
                                <th> ${숫자.bcontent} </th>
                              </tr>`
                })
                countPrint.innerHTML = html
            },//s e
            error: function(error) {
                // 오류 처리
             console.error(error);}
        })//a e
    }// s e

})// a e

}//f e