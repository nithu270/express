import express from "express"; 
import {createValidationSchema} from './utils/validationSchema.mjs';
import { validationResult,matchedData , checkSchema } from "express-validator";
import mongoose from "mongoose";
import { Prod } from "./mongoose/prod.mjs";




const app = express();
const port = "8000";
app.use(express.json()); //to send the data in json format
app.listen('8000','localhost',()=>{
    console.log("app running in port 8000");
});

const prod = [ //array of json objects
    {id:1 , name:"shirt" , rate : 700},
     {id:2 , name:"t-shirt" , rate : 500},
      {id:3 , name: "shorts", rate : 300},
       {id:4 , name:"kurta" , rate : 700},
        {id:5 , name: "pant" , rate : 800},
    
]; 

//mongodb connection
mongoose.connect('mongodb://localhost/express') //this will return a promise 
.then(()=>
    console.log("db connected")
).catch((err)=>
    console.log(`Error : ${err}`)
); 

//(req,res) its a req handler
app.get('/prod',(req,res)=>{
    
    res.status(200).send(prod);
});
//posting new data to the db

app.post('/prod',checkSchema(createValidationSchema),async (req,res)=>{  //while posting the data we need to check the schema , checkSchema() takes your validation rules (schema).
   const result = validationResult(req);
   console.log(result);
   if(!result.isEmpty()){  //errors in the result are in the form of array
    return res.status(400).send(result);
   }
    let id = 1;
  let {rid , name , rate} = req.body; //obj destructuring 
  if(rid){
    const exists = prod.some(p=> p.id === rid); //some function iterate through the products and if it exists it will return true
    if(exists){
        res.send("id already exists");
    }

id = rid;
    
  }
  else{
id = 1;
while(prod.some(p => p.id === id)){
    id++;
}
  }
});
//using another route to push data to mongodb
app.post('/products',checkSchema(createValidationSchema),async (req,res)=>{  //while posting the data we need to check the schema , checkSchema() takes your validation rules (schema).
  
      const body = matchedData(req);
    const newProd = new Prod(body);
try{
const savedProd = await newProd.save();//this will save the prods in db
  return res.status(201).send(savedProd);
}
catch(err){
  console.log(err);
return res.status(400).send({
  msg:"prod not saved"
})
}
});
//whenever we add a data to the db (id is auto incremented)

//put - it requires full body to be inserted (all fields are required)
//to update particluar record (changes everythin in that row)
app.put('/prod/:id',getProdIndexById ,(req,res)=>{
 const ind = req.prodIndex;
 const pid = Number(req.params.id);
const {name , rate} = req.body;
prod[ind] = {
    pid,name,rate  //replace all the fields with the new one
};
res.status(201).send(prod[ind]);

});


//patch - partial updation
app.patch('/prod/:id',getProdIndexById,(req,res)=>{
  const ind = req.prodIndex;
const {body} = req;
prod[ind] = {
...prod[ind], //this spread operator will help u to add patches to the org body
...body
};
return res.sendStatus(200);
});

//delete
app.delete('/prod/:id' ,  getProdIndexById , (req,res)=>{
       const index = req.prodIndex;
       console.log(index);
prod.splice(index, 1); // if i want to delete 4th id ind = 3 and it deletes the next one that is 4
// (if i give 2 it will delete both 4 and 5)
return res.sendStatus(200);
}) 



//using a middleware

function getProdIndexById(req,res,next){
const id= Number(req.params.id); //this conversion is very important
const prodIndex = prod.findIndex(p=>p.id === id);
if(prodIndex===-1){
    return res.send("invalid id");
}
req.prodIndex = prodIndex;
next();
}