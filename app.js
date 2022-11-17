const express = require("express");
const { exit } = require("process");
mysql = require("mysql");
bodyparser = require("body-parser"); 
path = require("path");

var port = process.env.port || 1234; 
var app = express();

app.use(express.static('./public',{index:'login.html'}))
app.use(bodyparser.urlencoded({"extended":true}))
app.use(bodyparser.json())


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students_database",
    charset: "utf8mb4",
    multipleStatement: true
})

db.connect(err=>{
    if (err) {console.log(err,'Database connection error!')}
    if (!err) console.log("Database connected successfully...")
})

app.get("/start",(req,res) => res.sendFile(`${__dirname}/public/index.html`))

//students CRUD database
// app.get("/students",(req,res) => {
//     var sql="select * from student";
//     db.query(sql, (err,results) => {
//         if (err) res.status(500).json(err)
//         res.json({results})
//     })
// });
var server = app.listen(port, () => {
    require("dns").lookup(require("os").hostname(), (err,addr,fam) => console.log(`Listening at port: ${port} \nhttp://${addr}:${port}`))
})


//api
app.get("/students",(req,res) => {
    var sql = "select * from student"
    db.query(sql, (err,results) => err ?  res.status(500).json(err) : res.json(results))
})

app.post("/students",(req,res) => {
    var students = req.body;
    var sql = `insert into student (idno,lastname,firstname,course,level) values ('${students.idno}','${students.lastname}',
            '${students.firstname}','${students.course}','${students.level}')`;
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"Student added!"})
    })
});

app.delete("/students/",(req,res) => {
    var students = req.body;
    var sql = `delete from student where idno=${students.idno}`
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"Student delete!"})
    })
});

app.put("/students",(req,res) => {
    var students = req.body;
    var sql = `update student set idno='${students.idno}',lastname='${students.lastname}',firstname='${students.firstname}',
            course='${students.course}', level='${students.level}' where idno=${students.idno}`;
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"Student updated!"})
    })
})

//Users CRUD database
// app.get("/users",(req,res) => {
//     var sql = "select * from user"
//     db.query(sql,function(err,results,fields){
//         if (err) res.status(500).json(err);
//         res.json({results})
//     })
// })
app.get("/users",(req,res) => {
    let sql = "select * from user"
    db.query(sql, (err,results) => err ? res.status(500).json(err) : res.json(results))
})

app.post("/users",(req,res) => {
    var users = req.body;
    var sql = `insert into user (id,username,password) values ('${users.id}','${users.username}',
            '${users.password}')`;
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"User added!"})
    })
})

app.delete("/users",(req,res) => {
    var users = req.body;
    var sql = `delete from user where id=${users.id}`
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"User deleted!"})
    })
})


app.put("/users",(req,res) => {
    var users = req.body;
    var sql = `update user set id='${users.id}',username='${users.username}',password='${users.password}'
                where id=${users.id}`;
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"User updated!"})
    })
})