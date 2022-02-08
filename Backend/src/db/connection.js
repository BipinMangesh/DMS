const mongoose = require('mongoose');
const mongoUri='mongodb://localhost:27017/myMongoDatabase';
mongoose.connect(mongoUri,{ useUnifiedTopology: true,useCreateIndex:true,useUnifiedTopology:true } )
.then( () => console.log("database connection established successfully!"))
.catch( (err) =>console.log(err) );