//휴먼 상태 확인

import {LoginContext, LoginObject } from "../../context/User"
import { account_rest, findid } from "../../DTO/userDB";
import { ILoginPolicyResult, Policy } from "../policy"
const moment = require('moment');


export class Account_status extends Policy{
    public apply(context: LoginContext | undefined): Promise<ILoginPolicyResult> {
        return new Promise((resolve, reject)=>{
            if(context){
                let current = account_rest(context.id)
                let currentaccount = findid(context.id)
                if(current){
                    let user_identifier : ILoginPolicyResult = {
                        status : 0,
                        message : "일치",
                        user : context,
                        current : currentaccount
                    }
                    resolve(user_identifier)
                }
                
                else{
                    
                    let user_identifier : ILoginPolicyResult = {
                        status : 2,
                        message : "dormant"
                    }
                    reject(user_identifier)
                }
            } 
        })
    }
}




