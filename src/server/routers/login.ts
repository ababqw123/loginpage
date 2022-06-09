import express from "express";
import { LoginContext } from "../../../model/context/User";
import { Account_status } from "../../../model/policies/login/account_status";
import { Contract_period } from "../../../model/policies/login/contract_period";
import { Identifier } from "../../../model/policies/login/identifier";
import { ILoginPolicyResult } from "../../../model/policies/policy"
const router = express.Router()
router.use(express.json());
router.use(express.urlencoded({extended : true}));
let identifier = new Identifier();
let contract_period = new Contract_period();
let account_status = new Account_status();

// 기본 위치
router.get('/', (req, res) => {
    res.render('login')
})


//form login 클릭시, 아이디 및 패스워드 확인
router.post('/',async(req, res) => {

let loginContext = new LoginContext(req.body.user_id,req.body.user_pw)
identifier.apply(loginContext)
.then((resolve : ILoginPolicyResult)=>{
    return contract_period.apply(resolve.user)
})
.then((resolve : ILoginPolicyResult)=>{
    return account_status.apply(resolve.user)
})
.then((resolve : ILoginPolicyResult)=>{
    res.render('main',{user:resolve.current})
})
.catch((reject : ILoginPolicyResult)=>{
        res.render('login', {result: reject.message});
})
});


module.exports = router;

