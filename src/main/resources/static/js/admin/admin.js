console.log("Admin Main")

check()

function check(){
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (r) => {
            if(r.uno==1){
//            console.log(r)
//            alert("로그인 성공")
            }
            else{
            alert("접근 불가능한 페이지입니다.")
            location.href="/user/login"
            }
        }
    })
}