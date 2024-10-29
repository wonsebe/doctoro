console.log('login.js');

// 로그인 함수
function doLogin() {    console.log('doLogin()');
    // 1. 입력한 값 가져오기
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;

    // 2. 객체화
    data = {
        id : id,
        password : pw
    }
    console.log(data);

    // 3. ajax
    $.ajax({
        async : false,
        method : 'post',
        url : '/user/login',
        data : data,  
        success : (result) => {
//            console.log(id);
            console.log(result);
            if (result) {

//                console.log(id)

                $.ajax({
                    async : false,
                    method : 'get',
                    url : '/admin/userall',
                    success : r => {
                        console.log(r)
                        console.log(id)
                        r.forEach(r2 => {
//                            console.log(r2['id'])
                            if(r2['id'] == id){
                            console.log("존재");
                            uno = {uno : r2['uno']}
                            $.ajax({
                                async : false,
                                method : 'POST',
                                url : '/point/add',
                                data : uno,
                                success : r3 => {
                                    console.log(r3);
                                }
                            })
                            }
                        })
                    }
                }) //ajax 종료
                alert('로그인 성공');
                location.href = "/";
            } else {
                alert('로그인 실패');
            }

        }   // success end

    })  // ajax end

}   // doLogin() end

