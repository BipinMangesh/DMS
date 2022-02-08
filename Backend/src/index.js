require("dotenv").config();
require("./models/User");
require("./models/Track");
const express = require("express");

const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
//mongo account => b.singh@direction.biz direct2s

const app = express();
//make uploads directory static
app.use(express.static('uploads'));
const port=process.env.PORT || 3000;
// enable files upload

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
  createParentPath: true,
  limits: { 
      fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  },
}));
app.use(authRoutes);
app.use(trackRoutes);
const mongoUri='mongodb+srv://bipinsin:direct2s@cluster0.z8p7e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri,{ useUnifiedTopology: true,useCreateIndex:true,useUnifiedTopology:true } )
.then( () => console.log("database connection established successfully!"))
.catch( (err) =>console.log(err) );

const connection = mongoose.connection;
 connection.once('open', () => { console.log("MongoDB database connection established successfully"); }
);



app.get("/", (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});
console.log("port--",process.env.PORT);