var Db  = require('./dboperations');
var Order = require('./order');
const dboperations = require('./dboperations');
var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
const morgan = require('morgan');
const _ = require('lodash');

const fileUpload = require('express-fileupload');
const { server } = require('./dbconfig');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('', router);
app.use(morgan('dev'));
// enable files upload
app.use(fileUpload({
   createParentPath: true,
   limits: { 
       fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
   },
}));
router.use((request,response,next)=>{
   console.log('middleware');
   next();
})



router.route('/Transmittals').get((request,response)=>{
    dboperations.getTransmittals().then(result => {
      console.log("result",result); 
      response.json(result);
    })

})

router.route('/Transmittal/:id').get((request,response)=>{
    dboperations.getTransmittal(request.params.id).then(result => {
       response.json(result[0]);
    })
})

router.route('/Transmittal').post((request,response)=>{
   let data=request.body;
   dboperations.addEditTransmittal(data).then(result => {
      response.json(result);
   })
})

router.route('/Transmittal/:id').delete((request,response)=>{
   dboperations.deleteTransmittal(request.params.id).then(result => {
      response.json(result);
   })
})





//make uploads directory static
app.use(express.static('uploads'));


var port = process.env.PORT || 3000;
app.listen(port);
console.log('DMS API is runnning at ' + port);


