function selectround(){
let set_size = document.querySelector('.roundcate').value;

console.log(set_size);
$.ajax({
    async:false,
    url : 'http://localhost:5000/tnmt',
    method : 'get',
    data : { set_size : set_size},
    success : (r) => {
        console.log(r);
        //r.이미지,이름,아이디 가져와서 랜덤으로 띄우고 빼고 리스트에 반복시켜서 만들기
        let tnmtTbody = document.querySelector('.tnmtTbody');
        let html = '';
        r.forEach(e => {
            html += `<tr> <td> <img src=${e[1].values}/>
                    </td> <td> <img src=${e.이미지}/> </td>
                    </tr>`
        })
        tnmtTbody.innerHTML = html
    }
})
}

