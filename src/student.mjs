import express from "express"
import cookieParser from "cookie-parser"
import {studentSchema} from './utils/validationSchema.mjs';
import { validationResult,matchedData , checkSchema } from "express-validator";
import mongoose from "mongoose";
import { Student } from "./mongoose/prod.mjs";
import { hashPwd } from "./utils/helper.mjs";

const app = express();
const port = 8090;
app.listen(8090,'localhost',()=>{
    console.log("app running in 8090");
});
const students = [
  { id: 1, name: "Nithya", dept: "IT", year: 3 },
  { id: 2, name: "Shree", dept: "CSE", year: 2 },
  { id: 3, name: "Teja", dept: "IT", year: 3 },
  { id: 4, name: "Bharath", dept: "ECE", year: 1 },
  { id: 5, name: "Karthik", dept: "CSE", year: 2 }
];
app.use(cookieParser());

//mongodb connection
mongoose.connect('mongodb://localhost/students') //this will return a promise 
.then(()=>
    console.log("db connected")
).catch((err)=>
    console.log(`Error : ${err}`)
); 

app.get('/',(req,res)=>{
    res.cookie("user","student" , {maxAge:60000*60});
    if(req.cookies.user==="student"){
        res.send(students);
    }
    else{
        res.send("u r not authorised");
    }
  
});
app.use(express.json());

app.post('/students',checkSchema(studentSchema) ,async(req,res)=>{
  const body = matchedData(req);
  body.password = hashPwd(body.password);
  const newStu = new Student(body);
  try{
    const savedStu = await newStu.save();
    return res.status(201).send(savedStu);
  }
catch(err){
    console.log(err);
    return res.status(400).send(err.message);
}
});






//google authentication
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) { //done is a callback function used by Passport.js to finish the authentication process.
   try{
const stu = await Student.findOne({googleId:profile.id});
if(user){
    return done(null,stu);
}
const newStudent = await Student.create({
    user_name : profile.displayName,
    googleId:profile.id
});
return done(null,newStudent);
   }
    catch(err){
        return done(err);
    }
  }
));





app.get('/students',(req,res)=>{

    const Name = req.query.name;
    const Dept = req.query.dept;
    if(Name){
 const stuname = students.find(stu=>stu.name==Name);
    return res.send(stuname);
    }
    if(Dept){
        
const studept = students.filter(stu=>stu.dept==Dept); //if u use find here it will return 1st matched stu
    return res.send(studept);
   }
});


