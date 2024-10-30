console.log('update.js')

// 1. 내정보 호출
doMyInfo();
function doMyInfo() {   console.log('doMyInfo()');
    $.ajax({
        async : false,
        method : 'get',
        url : '/user/my/info',
        success : (result) => {     console.log(result);
            if (result == '') {
                alert("로그인 후 이용 가능합니다.");
                location.href="/user/login";
            } else {
                // input에 회원 정보 넣어주기
                document.querySelector('#id').value = result.id;
                document.querySelector('#name').value = result.name;
                document.querySelector('#phone').value = result.phone;
                document.querySelector('#birth').value = result.ubirth;

                let address = result.address.split("_");
                console.log(address);
                document.querySelector('#sample6_address').value = address[0];
                document.querySelector('#sample6_detailAddress').value = address[1];

                // 라디오 버튼에서 회원 성별 보여주기
                let gender = document.getElementsByName("gender");
                gender.forEach((radio) => {
                    if (radio.value == result.gender) {
                        radio.checked = true;
                    }
                });
            }
        }   // success end
    })  // ajax end
}   // doMyInfo() end

// 2. 회원 정보 수정 함수
function doUpdate() {   console.log('doUpdate()');
    // id는 값을 가져오니까 doCheck[0] false여도 넘어갈 수 있도록 1부터 시작
    for (let i = 1; i < doCheck.length; i++) {
        if (!doCheck[i]) {
            alert('유효하지 않은 정보가 있습니다.');
            return;
        }
    }

    // 입력값 가져오기
    let pw = document.querySelector('#pw').value;
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;

    let sample6_address =document.querySelector('#sample6_address').value;
    let sample6_detailAddress= document.querySelector('#sample6_detailAddress').value;
    let address = sample6_address + "_" + sample6_detailAddress

    // 객체화
    let data = {
        password : pw,
        name : name,
        phone : phone,
        address : address
    }
    console.log(data);

    // ajax
    $.ajax({
        async : false,
        method : 'put',
        url : '/user/update',
        data : data,
        success : (result) => {     console.log(result);
            if (result) {
                alert('회원 정보 수정 성공');
                location.href = '/user/myinfo';
            } else {
                alert('회원 정보 수정 실패');
            }
        }   // success end
    })  // ajax end
}   // doUpdate() end

// 다음 지도 함수
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}