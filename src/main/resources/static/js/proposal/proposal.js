// 1. 로그인 체크
proposalCheck();
function proposalCheck() {
    console.log('doLoginCheck');
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/login/check',
        success: (result) => {
            console.log(result);

        }   // success end
    })  // ajax end
}   // doLoginCheck() end