const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


function AsyncAllBooks()
{
		const axios = require('axios').default;
let url = "https://namartakumar-7000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/"
async function asyncCall() {
  console.log('calling');
  const result = await axios.get(url);
  console.log(result.data);
}
asyncCall();

}

function PromiseISBN(isbn)
{
		

const axios = require('axios').default;
const connectToURL=(url)=>{
  const req=axios.get(url);
  console.log(req);
  req.then(resp=>{
  console.log("Fulfilled");
  console.log(resp.data);
  })
  .catch(err=>{
  console.log("Rejected");
  });
}
connectToURL("https://namartakumar-7000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/" + isbn)


}


function checkUsernameAvailability(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && username.length > 0) {
            return true// Username found, return true indicating it's already in the list
        }
    }
    return false; // Username not found, return false indicating it's not already in the list
}


public_users.post("/register", (req,res) => {
 const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
	
	
    if (!checkUsernameAvailability(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   res.send(JSON.stringify(books,null,4));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
	const author = req.params.author;
    for (var key in books) {
        if (books.hasOwnProperty(key) && books[key].author === author) {
            res.send(books[key]);
        }
    }
    //return null;
  //Write your code here
  return res.status(300).json({message: "Book not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
    for (var key in books) {
        if (books.hasOwnProperty(key) && books[key].title === title) {
            res.send(books[key]);
        }
    }
    //return null;
  //Write your code here
  return res.status(300).json({message: "Book not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
   const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
