var express=require('express');
var app=express();

var mysql=require('mysql');
var cors=require('cors');
var utils=require('util');

var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(cors());
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'expense_tracker'
});
var exe=utils.promisify(conn.query).bind(conn);

app.get("/",async function(req,res){
   
    res.send("Welcome to Expense Tracker Backend");
});
app.post("/save-expense",async function(req,res){
    var d=req.body;
    var sql=`insert into expense (descreption,date,paymentMethod,amount) 
     values ('${d.descreption}','${d.date}','${d.paymentMethod}',${d.amount})`;
    var result=await exe(sql);
    res.send(result);
});
app.get("/get-data",async function(req,res){
    var sql=`select sum(amount) as totalExpense from expense`;
    var result=await exe(sql);
    res.send(result[0]);
});
app.post("/save-earing",async function(req,res){
    var d=req.body;
    var sql=`update balance set totalEaring=${d.totalEaring}`;
    var result=await exe(sql);
    res.send({message:"Earning saved successfully"});
});
app.get("/getEarning",async function(req,res){
    var sql=`select totalEaring from balance where id=1`;
    var result=await exe(sql);
    res.send(result[0]);
});
app.get("/get-today-expense",async function(req,res){
    var date=new Date().toISOString().slice(0,10);
   
    var sql=`select * from expense where date='${date}'`;
    var amountsql=`select sum(amount) as totalAmount from expense where date='${date}'`;
    var result=await exe(sql);
    var totalAmountResult=await exe(amountsql);
    var obj={
        data:result,
        totalAmount:totalAmountResult[0].totalAmount
    }
    res.send(obj);
});
app.get("/Expense-list",async function(req,res){
    var data=await exe(`select *from expense`);
    res.send(data);
})

app.get("/delete/:id",async function(req,res){
    var id =req.params.id;
    var data=await exe(`delete from expense where id=${id}`);
    res.send(data);
});

app.post('/signup',async function(req,res){
    var d=req.body;
    var sql=`insert into user_det(name,email,mobile,password) values('${d.name}','${d.email}','${d.mobile}','${d.password}')`;
    var data=await exe(sql);
    res.send(data);
});
app.post("/login",async function(req,res){
  var d=req.body;
  var sql=`select *from user_det where email='${d.email}' and password='${d.password}'`;
  var data=await exe(sql);
  res.send(data);
});
app.listen(1000);