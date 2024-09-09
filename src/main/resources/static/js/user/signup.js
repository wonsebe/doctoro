console.log('signup.js');

// 1. 회원가입 함수
function doSignup() {   console.log('signup()');
    // 1. 입력값 가져오기
    let id = document.querySelector('#id').value;
    let password = document.querySelector('#password').value;
    let name = document.querySelector('#name').value;
    // let gender = document.querySelector('input[type=radio][name={gender}]:checked').value;
    let phone = document.querySelector('#phone').value;


    let gender = document.getElementsByName('gender');
  
    gender.forEach((node) => {
    if(node.checked)  {
      document.getElementById('result').innerText
        = node.value;
    }
  }) 

    // 2. 객체
    let data = {
        id : id,
        password : password,
        name : name,
        gender : gender,
        phone : phone
    }
    console.log(data);

    // 3. ajax
    $.ajax({
        async : false,
        method : 'post',
        url : '/user/signup',
        data : data,
        success : (result) => {     console.log(result);
            if (result) {
                alert('회원가입 성공');
                location.href = '/';
            } else {
                console.log('회원가입 실패');

            }
        }   // success end
    })  // ajax end

}   // doSignup() end
