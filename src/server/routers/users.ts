import express from "express";
import { add_register } from "../../../model/context/User";
import {  addUser, readUser } from "../../../model/DTO/userDB";

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({extended : true}));


//users의 기본 화면으로 이동
router.get('/', async(req, res) => {
    let users = await readUser()
    res.render('userList',{users:users})
})

// users/form이 입력될 시 이동
router.get('/form', (req, res) => {
    res.render('userInsertForm',{responseId: req.query.responseId})
})

// post 기본값으로 입력될 시 회원가입 실행
router.post('/', async(req, res) => {
    let admin = (req.body.user_admin == undefined)? false:true
    let permission = (req.body.user_admin == "admin")? [ 'read', 'write' ]: req.body.user_permission
    let add_user = new add_register(req.body.user_id,req.body.user_pw,req.body.user_company_code,admin,permission)
    let new_user = addUser(add_user)
    res.send({result : new_user, user : add_user})


})


// ajax에서 아이디를 받아와 읽기 권한이 있는지 확인 
router.get('/checkReadable', async(req, res) => {
    res.send({'result':"ture"})
})


module.exports = router;