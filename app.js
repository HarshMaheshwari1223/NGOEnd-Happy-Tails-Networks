const express = require('express');
const path = require('path')
const cors = require('cors');
const {  mongoose } = require('mongoose');
const { mongourl } = require('./keys');





const app = express();
const port = 5000;


app.use(cors()); 
// eske necche sare db files 

require('./Database/user.js')
require('./Database/addpet.js')

app.use(express.json());
// eske necche sare api files
app.use(require('./routes/auth'));
app.use(require('./routes/addactivity.js'));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


// ---------------------------------------------------------------------------------------------------------------------------------------------


mongoose.connect(mongourl);

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected');
});

mongoose.connection.on('error',()=>{
    console.log('Mongoose is not connected');
});


app.use(express.static(path.join(__dirname , "./frontend/build")))

app.get("*"  ,(req,res)=> {
    res.sendFile(
        path.join(__dirname , "./frontend/build/index.html"),

        function(err){
            res.status(500).send(err)
        }
    )
})