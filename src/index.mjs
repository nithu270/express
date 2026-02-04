//create a exp app , make it listen to a port , start creating the app modules
import express from "express"
const app = express();
const port = 8080;
app.listen(port,'localhost',()=>{
    console.log(`app running in port ${port}`);
});
const users = [
{id:"1",name:"nithya",role:"student"},
{id:"2", name :"shree",role:"faculty"}

]  //array of json obj (student detail)
app.get("/users/:id",(req,res)=>{ //route parameters are variable in the url(:id) ,
    //req params is an object which has all route params value - {id:1}
    const id = req.params.id;
    if(isNaN(id)){
        return "id is invalid";
    }
   
    const user = users.find(u=>u.id === id);
//      u → each user object one by one
// When .find() runs,
// First iteration: u = {id:1, name:"nithya"}
// Second iteration: u = {id:2, name:"shree"}
// It checks every element.
res.send(user);
       
    
});
//previously i have given the route as /users/:role..so it enters into the if condition , so routing params should be diff.
app.get("/users/roleofmember/:role",(req,res)=>{
    const role = req.params.role;
    const user = users.find(u=> u.role===role);
    res.send(user);
});
