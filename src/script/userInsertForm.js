$(function(){
    switch($('#result').val()){
        case 'success': 
            alert('회원등록이 완료되었습니다!');
            break;
        case 'failed':
            alert('회원등록이 실패되었습니다..');
            break;
        case 'existsId':
            alert('이미 존재하는 아이디입니다. 다시 입력해 주세요');
            break;
        default :
            break;
    }
    
    // 체크박스 이벤트
    $('#user_admin').on('change', checkAdmin);
    $('#form_register').on('submit', checkCompanyCode);
    $('#btn_submit').on('click',add_user);
})

function checkCompanyCode(){
    // 회사코드를 직접 선택해야한다 
    if($('#user_company_code').val() == '0'){
        alert('회사 코드를 선택해 주세요.');
        return false;
    }
}


// admin에 체크하면 read, write를 강제로 부여한다 
function checkAdmin(){
    setCheckedAndDisabled( $('#user_admin').is(':checked') ? true : false)
   
}

function setCheckedAndDisabled(status){
    $('#permission_read').prop({
        'checked':status,
        'disabled':status
    });
    $('#permission_write').prop({
        'checked':status,
        'disabled':status
    });
}


function add_user(){
    let user = $('#form_register').serialize()
    $.ajax({
        url	: "/users",
        type : "POST", 
        data : user,
        dataType: 'json',
        success : function(data) {
            switch (data.result){
                case 'success': 
                    alert('회원등록이 완료되었습니다!');
                    self.close();
                    window.opener.postMessage({responseId: responseId, req_data:data.user});
                    
                    break;
                case 'failed':
                    alert('회원등록이 실패되었습니다..');
                    break;
                case 'existsId':
                    alert('이미 존재하는 아이디입니다. 다시 입력해 주세요');
                    break;
                default :
                    break;
            }
        },
        error : function(err){
            console.log(err);
        }
    })
}
