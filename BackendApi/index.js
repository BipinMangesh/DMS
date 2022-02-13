
var express = require('express');
var bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

var cors = require('cors');
var app = express();
var router = express.Router();
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
const transmittalRoutes = require("./routes/transmittalRoutes");
const homeRoutes = require('./routes/home-routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(path.join(__dirname, 'views')));
app.use('', router);
app.use(morgan('dev'));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));




// enable files upload
app.use(fileUpload({createParentPath: true,  limits: { 
       fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
   },
}));

//make uploads directory static
app.use(express.static('uploads'));
router.use((request,response,next)=>{
   console.log('middleware');
   next();
})
app.use(homeRoutes.routes);
app.use(transmittalRoutes);

//app.use('/', (req,res, next)=>{
  // return res.sendFile(path.join(__dirname,'../views/index.html'));
//});






var port = process.env.PORT || 3000;
app.listen(port);
console.log('DMS API is runnning at ' + port);


