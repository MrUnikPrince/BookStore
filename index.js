const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// Creating a Server 
app.listen(PORT, (err)=> {
    if(err){console.log("Error in running server: ", err);}
    console.log(`Server is UP and running on PORT : ${PORT}`);
    
})