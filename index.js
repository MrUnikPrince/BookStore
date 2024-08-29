require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoose');
const PORT = process.env.PORT || 3000;
const app = express();


// Connect to MongoDb
connectDB();
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// book routes
// app.use("/books", require('./routes/bookRoutes'));

// Home routes
app.get("/", (req,res) => {
    res.send("Hello I am busy");
});


// Creating a Server 
app.listen(PORT, (err)=> {
    if(err){console.log("Error in running server: ", err);}
    console.log(`Server is UP and running on PORT : ${PORT}`);
    
})