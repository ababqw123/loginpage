// onload
$(function(){
    // session의 user 정보에 permission을 확인하여 
    // read / write에 따라 권한을 부여한다 
    $('#btn_register').on('click',onClickRegister)
    $('#btn_list').on('click',onClickList)
    
})

// 등록 눌렀을 때 
async function onClickRegister(){
    
  let option = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no'
    let message = await ecount.popup('/users/form', 'form', option)
    console.log(message)
    alert(JSON.stringify(message))


    // // 버튼 비활성화 
    // $('#btn_register').attr('disabled',true);

    // // 버튼 다시 활성화 
    // $(popup_register).on('load', () => {
    //     $(popup_register).on('unload', () => {
         
    //         $('#btn_register').attr('disabled',false);
    //     })
    // })
    
}

// 목록 눌렀을 때 
function onClickList(){
    let option = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no'

    $.ajax({
        url	: "/users/checkReadable", 
        type : "GET", 
        contentType : "application/json", 
        dataType : "json", 
        data : {user_id:$('#input_user_id').val()},
        success : function(data) {
            if(data.result){
                // 윈도우 팝업 시작

                let popup_list = window.open('/users', 'form', option)
                // 버튼 비활성화 
                $('#btn_list').attr('disabled',true);
            
                // 버튼 다시 활성화 
                $(popup_list).on('load', () => {
                    $(popup_list).on('unload', () => {
                        
                        $('#btn_list').attr('disabled',false);
                    })
                })
            }else alert('해당 목록을 확인할 수 없습니다. 권한을 요청하세요.')
        },
        error : function(err){
            console.log(err)
        }
    })


}



////////////////////////////////////////////////////////////////

class MessageBroker {
    constructor() {
      this.table = new Map();
    }
  
    publish(responseId, data) {
      if (this.table.has(responseId)) {
        const subscriber = this.table.get(responseId);
        subscriber(data);
      }
    }
    subscribe(key, subscriber) {
      this.table.set(key, subscriber);
    }
  }
  
  
  const Broker = new MessageBroker();
  
  window.addEventListener("message", function (event) {
    if (event.data.responseId !== undefined) {
      Broker.publish(event.data.responseId, event.data.req_data);
    }
  
  });
  
  const ecount = {
    popup: function (url, name, option) {// register, popup01, 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no');
      return new Promise((resolve, reject) => {
        const responseId = Date.now().toString(); //키값 : 현재시간으로
        Broker.subscribe(responseId, resolve) //resolve를 콜백으로 전달....! 일급객체라 가능한 일..
        window.open(`${url}?responseId=${responseId}`, name, option);
      })
    }
  }
