import express from "express";
const router = express.Router()

//main의 기본 화면으로 이동
router.get('/', (req, res) => {
    
    res.render('main')
})

module.exports = router;