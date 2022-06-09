//회사계약기간

import {LoginContext, LoginObject } from "../../context/User"
import { ILoginPolicyResult, Policy } from "../policy"
import { readCompany,loginCheckEmpire} from "../../DTO/companyDB";
const moment = require('moment');
const express = require('express')

export class Contract_period extends Policy{
    public apply(context: LoginContext | undefined): Promise<ILoginPolicyResult> {
        return new Promise((resolve,reject)=>{
            if(loginCheckEmpire(context)){
                let user_identifier :ILoginPolicyResult = {
                    status : 0,
                    message : "일치",
                    user : context
                }
                resolve(user_identifier) 
    
            }
            else{
                let user_identifier :ILoginPolicyResult = {
                    status : 1,
                    message : "empire"
                }
                reject(user_identifier) 
            }

        })
        
    }
}


