console.log('detail.js');
let urlParams=new URL(location.href).searchParams;
let bno=urlParams.get("bno") //현재 URL 경로상의 bno 값 호출

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

detailB(); //개별 출력 
function detailB(){

    $.ajax({
        url:"/board/bdetail",
        method:'get',
        data:{bno:bno},
        success: (r)=>{
            console.log(r);
            let printDetailBox=document.querySelector('.printDetailBox').value
            let html=''
            r.forEach(개별출력=>{
                html+=``
            
            })

           
        }

    })
    printDetailBox.innerHTML=html;



}