function pydb(){
    $.ajax({
        async: false,
        url: '/pro/get',
        method: 'GET',
        success: r => {
            console.log(r);
        }
    })
}