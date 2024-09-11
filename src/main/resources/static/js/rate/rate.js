console.log("rate.js");

poke_select()
function poke_select(){
    let select = document.querySelector("#poke_select")
    let html = ``;
    $.ajax({
        async : false,
        method : "get",
        url : "http://127.0.0.1:5000/rate/all_info",
        success : function response(result){
            console.log(result);
            
        }
    
    })
}


function poke_read(){

}