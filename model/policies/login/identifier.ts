//기본 ID 확인

import {LoginContext, LoginObject } from "../../context/User"
import { readUser,matcheduser } from "../../DTO/userDB";
import { ILoginPolicyResult, Policy } from "../policy"


const express = require('express')


export class Identifier extends Policy{
    public apply(context: LoginContext): Promise<ILoginPolicyResult> {

        return new Promise((resolve,reject)=>{
        if(matcheduser(context)){
            let user_identifier : ILoginPolicyResult = {
                status : 0,
                message : "일치",
                user : context
            }
            resolve(user_identifier)
        }
        else{
            let user_identifier : ILoginPolicyResult = {
                status : 3,
                message : "failed"
            }
            reject(user_identifier)
        }
        })
    }    
}
