import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { LoginContext, LoginObject, add_register } from '../context/User';
const moment = require('moment');

//readUsers 파일 읽기
export function readUser() : Array <LoginObject>{
    let users = JSON.parse(readFileSync(__dirname+'/save/users.json', 'utf8'));
    return users.users;
}

//입력에 맞는 값 찾기
export function matcheduser(loginContext :LoginContext) : boolean{
    let users = readUser();
    let matchedUser = users.find((item : LoginObject)=>{
        return item.id == loginContext.id && item.password == loginContext.password
    })
    if(matchedUser){
        return true;
    }
    else{
        return false;
    }
}

export function findid(text :string) :LoginObject | undefined {
    let users = readUser();
    let matchedUser = users.find((item : LoginObject)=>{
        return item.id == text
    })
    if(matchedUser){
        return matchedUser
    }
    else
    return undefined 
}

//추가
function writeUser(user: object){
    writeFileSync(__dirname+'/save/users.json', JSON.stringify(user));
}


//변경
export function change_resister(context: string) {
        const users = readUser()
        for(let index in users){
            if(users[index].id == context){
                users[index].visit_date = moment().format("yyyy/MM/DD");
                break;
            }
        }
        writeUser(users)
        return "변경성공";
}

export function account_rest(context : string) : boolean{
    
    let users : Array <LoginObject> = readUser();
    let user = users.find((item : LoginObject)=>{
        return item.id == context
    })

    
    if(user){
        const today = moment().format("yyyy/MM/DD")
        let today_Array : Array<string> = today.split('/')
        let company_Array : Array<string> = user.visit_date.split('/')
        let a = moment([today_Array[0],today_Array[1],today_Array[2]])
        let b = moment([company_Array[0],company_Array[1],company_Array[2]])
        return a.diff(b, 'days')<30
    }
    else{
        return false
    }

    
}


    export function addUser(adduser : add_register) : string{

        const users = readUser()
        let current_user = users.find(user => {
            return user.id == adduser.id
        })
        if(current_user){
            return "existsId";
        }
        else{
            let user : LoginObject = {
                id : adduser.id,
                password: adduser.password,
                permission: adduser.permission,
                admin: adduser.admin,
                company_code: adduser.company_code,
                register_date: adduser.register_date,
                visit_date: moment().format("yyyy/MM/DD")
            }
            let result_registerUsers = registerUser(user,users)
            return "success"
        }
    }

    function registerUser(user : LoginObject,users : Array<LoginObject>){
        // 먼저 users.json 꺼낸다 
        users.push(user);
    
        // 새로운 데이터를 넣은 뒤,
        let new_users_json = {
            "users":users
        }
        writeUser(new_users_json)
    
        return "완료"
    }
    


