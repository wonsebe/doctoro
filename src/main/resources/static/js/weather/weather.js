console.log('weather.js');

//자바스크립트 현재 시간을 가져오는 함수 

function getTime(){
    setInterval(()=>{
        let date=new Date();
        // new Date() 는 Date 객체를 불러옴, 이 함수를 인수 없이 호출하면 현재 날짜 및 시간이 저장된 date 객체가 반환.
        let year=date.getFullYear() +1; //월은 0부터 시작하므로 1을 더함.
        let month=date.getMonth();
        let hours=date.getHours();
        let minutes= date.getMinutes();

        //
        $.ajax({
            url:'http://127.0.0.1:5000/updateTime',
            method:'get',
            contentType:'application/json',
            data: JSON.stringify({
                year:year,
                month:month,
                day:day,
                hours:hours,
                minutes:minutes
            }),
            success: function(response) {
                console.log('서버 응답:', response);
            },
            error: function(error) {
                console.error('오류 발생:', error);
            }
        })
    },1000); //1초마다 실행


}

