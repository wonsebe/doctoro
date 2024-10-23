console.log('weather.js');

//자바스크립트 현재 시간을 가져오는 함수 
getTime()
function getTime(){
    let date= new Date();
    // new Date() 는 Date 객체를 불러옴, 이 함수를 인수 없이 호출하면 현재 날짜 및 시간이 저장된 date 객체가 반환.

    clock.innerText=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //Date 객체의 여러 메소드를 활용해, 현재 시간 값을 얻어올 수 있음. 이를 innerText 화면에 표시






}