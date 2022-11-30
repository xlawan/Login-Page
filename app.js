const express = require("express");
const { devNull } = require("os");
const { exit } = require("process");
mysql = require("mysql");
bodyparser = require("body-parser"); 
const path = require("path");
//const webcam = require("webcam-easy");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/assets/images")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

var port = process.env.port || 1234; 
var app = express();

app.use(express.static('./public',{index:'login2.html'}))
app.use(bodyparser.urlencoded({"extended":true}))
app.use(bodyparser.json())
///
///

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
app.get("/main",(req,res) => res.sendFile(`${__dirname}/public/login2.html`))

var server = app.listen(port, () => {
    require("dns").lookup(require("os").hostname(), (err,addr,fam) => console.log(`Listening at port: ${port} \nhttp://${addr}:${port}`))
})

//students CRUD database
// app.get("/students",(req,res) => {
//     var sql="select * from student";
//     db.query(sql, (err,results) => {
//         if (err) res.status(500).json(err)
//         res.json({results})
//     })
// });



//api
app.post("/login",(req,res)=>{
    var data=req.body;
    var username=data.username;
    var password=data.password;
    var sql = "select * from user where `username`='"+username+"' && `password`='"+password+"'";
    db.query(sql, (err,results,fields)=>{
        if(err) return res.status(500).json("Login Failed.");
        if(results.length>0) {
            res.redirect("/start")
            console.log(username,password,"Login Successful",results)
        }else{
            res.redirect("/main?message=Login Failed")
            console.log(username,password,"Login Failed",results)
        }
    })
})

//for image
// app.post("/upload", upload.single("image"), (req,res) =>{
//     var { path } = req.file;
//     var sql = `insert into student (image) values ('${path.slice(21,path.length)}')`;
//     db.query(sql,function(err,results,fields){
//         if (err) res.status(500).json(err);
//         res.json({"message":"Image uploaded!"});
//         res.send("Image uploaded");
//         console.log(path);
//     })
    
// })

//
app.get("/students",(req,res) => {
    var sql = "select * from student"
    db.query(sql, (err,results) => err ?  res.status(500).json(err) : res.json(results))
})

app.post("/students",upload.single("image"),(req,res) => {
    var students = req.body; 
    var { path } = req.file;
    var sql = `insert into student (idno,lastname,firstname,course,level,image) values ('${students.idno}','${students.lastname}',
            '${students.firstname}','${students.course}','${students.level}','${path.slice(21,path.length)}')`;
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.redirect("/start");
        //res.json({"message":"Student added!"});
        console.log(students,path)
    })
});

app.delete("/students/",(req,res) => {
    var students = req.body;
    
    var sql = `delete from student where idno=${students.idno}`
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.json({"message":"Student delete!"});
    })
});

app.put("/students",upload.single("image"),(req,res) => {
    var students = req.body;
    var { path } = req.file;
    var sql = `update student set idno='${students.idno}',lastname='${students.lastname}',firstname='${students.firstname}',
            course='${students.course}', level='${students.level}', image='${path.slice(21,path.length)}' where idno=${students.idno}`;
    db.query(sql,function(err,results,fields){
        if (err) res.status(500).json(err);
        res.redirect("/start");
        //res.json({"message":"Student updated!"})
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