const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const games =require('./routes/game')
require('./config/db')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.use('/games', games);
app.listen(8080);
console.log("Server is running...")