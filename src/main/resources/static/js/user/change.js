console.log("Change Page")

read()
function read() {

    let nowpoint = document.querySelector(".nowpoint");
    let html = '';

    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result['uno']);
            if (result == '') {                 // 비로그인 상태인 경우
                alert("로그인 후 이용 가능합니다.");
                location.href="/user/login";    // 로그인 페이지로 이동
            }
            else {
                $.ajax({
                    async : false,
                    method : "GET",
                    url : "/point/read",
                    data : {uno : result['uno']},
                    success : p => {
                        console.log(p);
                    }
                })
            }
        }   // success end
    })  // ajax end

}