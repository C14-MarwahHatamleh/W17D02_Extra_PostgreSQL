const express = require('express');
const { register } = require('../controllers/user');
const userRouter = express.Router();




userRouter.post("/",register)

module.exports = userRouter;
/*
** For test 
http://localhost:5000/users
{
"name":"sara",
 "email":"saraali@gmail.com", 
 "password" :"12345"


}

{
"name":"ahmad",
 "email":"ahamdjalal@gmail.com", 
 "password" :"12345"
}







*/
