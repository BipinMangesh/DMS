
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
const transmittalRoutes = require("./routes/transmittalRoutes");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.use('', router);
app.use(morgan('dev'));
// enable files upload
app.use(fileUpload({createParentPath: true,  limits: { 
       fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
   },
}));

router.use((request,response,next)=>{
   console.log('middleware');
   next();
})
app.use(transmittalRoutes);

app.use('/', (req,res, next)=>{
   return res.sendFile(path.join(__dirname,'../views/index.html'));
});
//make uploads directory static
app.use(express.static('uploads'));





var port = process.env.PORT || 3000;
app.listen(port);
console.log('DMS API is runnning at ' + port);


