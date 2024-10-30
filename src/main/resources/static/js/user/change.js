console.log("Change Page")

read()
function read() {
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
                        document.querySelector('.nowpoint').value = p;
                    },
                    error : e => {
                        console.log(e);
                    }
                })
            }
        }   // success end
    })  // ajax end

}

function change(){

    $.ajax({
        async : false,
        method : 'get',
        url : '/user/login/check',
        success : (result) => {     console.log(result['uno']);
            if (result == '') {                 // 비로그인 상태인 경우
                console.log("")
            }
            else {
                $.ajax({
                    async : false,
                    method : "GET",
                    url : "/point/read",
                    data : {uno : result['uno']},
                    success : p => {
                        console.log(p);

                        let inputpoint = document.querySelector('.inputpoint').value;
                        let point = inputpoint/10
                        console.log(point);

                        if(point > 10 ){
                            console.log(point);
                            $.ajax({
                                async : false,
                                method : 'POST',
                                url : '/point/change',
                                data : {uno : result['uno'],point_indecrease : point},
                                success : r => {
                                    console.log(r);
                                }
                            })

                            console.log(inputpoint);
                            let pointe = inputpoint - inputpoint - inputpoint;
                            console.log(pointe)

                            $.ajax({
                                async : false,
                                method : 'POST',
                                url : '/point/delete',
                                data : {uno : result['uno'],point_indecrease : pointe},
                                success : k => {
                                    console.log(k);
                                    read()
                                }
                            })
                        }
                        else {alert(" 100포인트 이상 부터 환전 가능합니다. ")}

                    },
                    error : e => {
                        console.log(e);
                    }
                })
            }
        }   // success end
    })  // ajax end

}