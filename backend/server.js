// 필요한 모듈 가져오기
const express = require('express');

// export된 db 객체 가져오기
const db = require('./db');

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 테이블 생성하기
db.pool.query(`CREATE TABLE lists (
        id INTEGER AUTO_INCREMENT,
        value Text, 
        PRIMARY KEY (id)
    )`, (err, results, fields) => {
        console.log('results', results);
    })

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주는 API
app.get('api/values', function(req, res) {

    // DB에서 모든 정보 가져오기
    db.pool.query(`SELECT * FROM lists;`, 
        (err, results, fields) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json(results)
        }
    )
})

// 클라이언트에서 입력한 값을 DB lists 테이블에 넣어주는 API
app.post('/api/value', function(req, res, next) {

    // DB에 값 넣어주기
    db.pool.query(`INSERT INTO lists value() VALUES("${req.body.value}")`,
    (err, results, fields) => {
        if(err)
            return res.status(500).send(err)
        else   
            return res.json({success: true, value: req.body.vaule})
    })
})


app.listen(5000, () => {
    console.log('Application running in port 5000');
})