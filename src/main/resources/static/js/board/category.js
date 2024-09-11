console.log('category.js');

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