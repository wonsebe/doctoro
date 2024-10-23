// console.log('weather.js');

// //자바스크립트 현재 시간을 가져오는 함수 
// // getTime();
// function getTime(){
//     setInterval(()=>{
//         let dateTime=new Date(); console.log(dateTime);
//         // new Date() 는 Date 객체를 불러옴, 이 함수를 인수 없이 호출하면 현재 날짜 및 시간이 저장된 date 객체가 반환.
//         let year=dateTime.getFullYear() ; console.log(year);
//         let month=dateTime.getMonth()+1; console.log(month); //월은 0부터 시작하므로 1을 더함. 
//         let date=dateTime.getDate();console.log(date);
//         let hours=dateTime.getHours();console.log(hours);
//         let minutes= dateTime.getMinutes();console.log(minutes);

//         //
//         $.ajax({
//             url:'http://127.0.0.1:5000/updateTime',
//             method:'get',
//             data: {
//                 year:year,
//                 month:month,
//                 date:date,
//                 hours:hours,
//                 minutes:minutes
//             },
//             success: function(response) {
//                 console.log('서버 응답:', response);
//                 let wPrint=document.querySelector('.wPrint')
//                 let html=`
//                     ${response.temperature} , 
//                     ${response.rainfall}
//                     `
                
//                 wPrint.innerHTML=html;
//             },
//             error: function(error) {
//                 console.error('오류 발생:', error);
//             }
//         })
//     },60000); //1분마다 실행


// }



