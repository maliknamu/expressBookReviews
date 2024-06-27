
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false
  }
}

function checkUsernameAvailability(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && username.length > 0) {
            return true// Username found, return true indicating it's already in the list
        }
    }
    return false; // Username not found, return false indicating it's not already in the list
}



function checkRegistration(username, password) {
    if (username && password) {
	
	
    if (!checkUsernameAvailability(username)) { 
      users.push({"username":username,"password":password});
      return true;
    } else {
      return false;    
    }
  } 
  return false;
}


//only registered users can login
regd_users.post("/customer/login", (req,res) => {
  //Write your code here
   const user = req.body.user;
    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: username
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
