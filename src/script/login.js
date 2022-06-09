$(function(){
    switch($('#result').val()){
        case 'failed':
            alert('아이디, 비밀번호가 일치하지 않습니다.\n 다시 입력해 주세요.')
            break;
        case 'dormant':
            alert('휴면계정입니다.\n관리자에게 문의해 주세요.');
            break;
        case 'empire':
            alert('만료된 회사 코드입니다.\n관리자에게 문의해 주세요.');
            break;
        default:
            break;
            
    }
})