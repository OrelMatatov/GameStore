const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const games = require('./routes/game')
const purchases = require('./routes/purchase')
const users = require('./routes/user')
const suppliers = require('./routes/supplier')

require('./config/db')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.use('/games', games);
app.use('/users', users);
app.use('/purchases', purchases);
app.use('/suppliers', suppliers)

app.listen(8081);
console.log("Server is running...")
