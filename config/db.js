
const mongoose = require('mongoose')
let uri = 'mongodb+srv://kohneitan:8p8NQevfzLnDhI1C@cluster0.2tygiba.mongodb.net/GameStore?retryWrites=true&w=majority';
mongoose.connect(uri,
    {useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
        console.log("Mongo is connected")
    }).catch((error) => {
        console.log("Failed connect to MongoDB: ", error)
});