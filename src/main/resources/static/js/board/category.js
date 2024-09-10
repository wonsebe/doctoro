console.log('category.js');

category();
function category(){
    //어디에
    let category=document.querySelector('#category').value
    //무엇을
    let html=''
    
    $.ajax({
        url:"/board/bcategory",
        method:'get',
        success:(result)=>{
            console.log(result);

            for(let i=0; i<result.length; i++){
                html+= `<option value="${result[i].categoryno}">${result[i].categoryname}</option>`
           
                //출력
                category.innerHTML=html;
           
            }

        }
    })
}