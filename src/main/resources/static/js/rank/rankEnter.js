console.log("rankEnter");

function enterTnm() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/login/check',
        success: (result) => {
            console.log(result);
            let loginNo = result['uno']     // 현재 로그인된 유저 번호 저장
            console.log(loginNo);
            if (result == "") {
                alert("로그인 후 이용 가능합니다.");
                location.href = "/user/login";    // 로그인 페이지로 이동
            } else {
                location.href = "/rank/tnm";
            }
        }
    })
}

function enterVoteCity() {
    $.ajax({
        async: false,
        method: 'get',
        url: '/user/login/check',
        success: (result) => {
            console.log(result);
            let loginNo = result['uno']     // 현재 로그인된 유저 번호 저장
            console.log(loginNo);
            if (result == "") {
                alert("로그인 후 이용 가능합니다.");
                location.href = "/user/login";    // 로그인 페이지로 이동
            } else {
                location.href = "/rank/voteCity";
            }
        }
    })
}