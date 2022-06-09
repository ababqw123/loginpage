
$(function(){

    class ActionBroker{
        table : Map<string,any>
        constructor() {
            this.table = new Map();
          }
          publish(key){
            const subscriber = this.table.get(key);
            subscriber();
        }
        subscribe(key : string, subscriber){
            this.table.set(key, subscriber)
        }
    }
    
    
    const actionBroker = new ActionBroker();
    
    window.addEventListener("keyup",(event : KeyboardEvent)=>{
        if(actionBroker.table.has(event.key)){
            actionBroker.publish(event.key)
        }
    })
    
    
    
    const Listenpress = function(key : string) : any{
        return function(target, propertyKey, descriptor){
            actionBroker.subscribe(key,function(){
                const subscriber = new target();
                subscriber.execute()
            })
        }
    
    }
    
    @Listenpress("F8")
    class SalesSave{
    
        execute(){
            let option = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no'
            window.open('/users/form', 'form', option)
        }
    
    }

    
})


