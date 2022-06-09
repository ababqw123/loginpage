import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { CompanyContext } from '../context/Company';
import { LoginContext, LoginObject } from '../context/User';
import { readUser } from './userDB';

const moment = require('moment');

//companys.json 읽기
export function readCompany() : Array <CompanyContext>{
    let companys = JSON.parse(readFileSync(__dirname+'/save/companys.json', 'utf8'));
    return companys.companys;
}

export function loginCheckEmpire(context : LoginContext | undefined){
    const companys = readCompany();
    const users : Array <LoginObject> = readUser()

    let user = users.find((item : LoginObject)=>{
        return item.id == context?.id
    })
    let company = companys.find(company => {
        return company.company_code == user?.company_code
    })
    
    const today = moment().format("yyyy/MM/DD")
    if(company){
        return company.empire_date > today
    }
    else {
        return false;}
}