const express = require('express');
//const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();
//Auth middleware
//router.use(requireAuth);
var config = require('../dbconfig');
const sql = require('mssql');

//get All
router.get('/api/Transmittals', async (req, res) => { 
    try {
      let pool = await sql.connect(config);
      let Transmittals=[];
      Transmittals = await pool.request().query("select t.*,transmittalDetailid,docNumber,description,rev,status,type from Transmittal t  inner join transmittalDetail d on t.transmittalid=d.transmittalid");       
      return  res.status(200).send({ data: Transmittals.recordsets,message: "Successfull"}); 
  }
  catch (error) {
      return  res.status(500).send({message: "Oops Something went wrong",error:error.message});
  }
});
//Getbyid
router.get('/api/Transmittal/:id', async (req, res) => {
  const id  = req.params.id;
    try {
      let pool = await sql.connect(config);
      let Transmittal = await pool.request()
          .input('input_parameter', sql.Int, id)
          .query("select t.*,transmittalDetailid,docNumber,description,rev,status,type from Transmittal t  inner join transmittalDetail d on t.transmittalid=d.transmittalid where t.transmittalid = @input_parameter");
          return  res.status(200).send({ data: Transmittal.recordsets,
            message:Transmittal.recordsets.lenght>0? `No data fund`: `Successfull`});          
      }
      catch (error) {
        return  res.status(500).send({message: "Oops Something went wrong",error:error.message}); 
      }
});
//add/Edit transmittal
router.post('/api/Transmittal', async (req, res) => {
  try {
        let Transmittal=req.body;
        if (!Transmittal) {  
          return  res.status(400).send({message: "Oops Something went wrong",error:'Bad Request'}); 
        }
        let id= Transmittal.transmittalid   
        let Query=id>0?`UPDATE [dbo].[Transmittal]  SET [wonNo] = @wonNo ,
        [wonTitle] = @wonTitle,[transmittalNo] =@transmittalNo ,[date] = @date ,
        [from] = @from ,[to] =@to WHERE transmittalid=@transmittalid`
        :`INSERT INTO [dbo].[Transmittal] ([wonNo],[wonTitle] ,[transmittalNo],
          [date],[from],[to]) VALUES (@wonNo ,@wonTitle ,@transmittalNo ,@date
              ,@from ,@to) SELECT SCOPE_IDENTITY() AS transmittalid`;  
        let detail=Transmittal.transmittalDetailData;   
        let pool = await sql.connect(config);
        let insertaTransmittal = await pool.request()
            .input('transmittalid', sql.NVarChar, Transmittal.transmittalid)
            .input('wonNo', sql.NVarChar, Transmittal.wonNo)
            .input('wonTitle', sql.NVarChar, Transmittal.wonTitle)
            .input('transmittalNo', sql.NVarChar, Transmittal.transmittalNo)
            .input('date', sql.Date, Transmittal.date)
            .input('from', sql.NVarChar, Transmittal.from)
            .input('to', sql.NVarChar, Transmittal.to)
            .query(Query);            
          let pkid=id==0?insertaTransmittal.recordset[0].transmittalid:id;
          console.log("pkids",pkid);   
          let deletedCount=id==0?0: await deleteTransmittalDetail(pkid);          
          for (let i = 0; i < detail.length; i++) {
            await inserDetailData(detail[i],pkid);
          }     
                 
          return  res.status(id>0?200:201).send({message:id>0? `Record updated successfully !`:
           `Record added successfully !`});          
      }
      catch (error) {
        return  res.status(500).send({message: "Oops Something went wrong",error:error.message}); 
      }  
});
async function inserDetailData(item,pkid) {
    try{

            //console.log("Item",item);  
            let pool = await sql.connect(config);
            let detail = await pool.request()
            .input('docNumber', sql.NVarChar, item.docNumber)
            .input('description', sql.NVarChar, item.description)
            .input('rev', sql.NVarChar, item.rev)
            .input('status', sql.NVarChar, item.status)
            .input('type', sql.NVarChar, item.type)
            .input('transmittalid', sql.Int, pkid)             
            .query(`INSERT INTO [dbo].[transmittalDetail] ([docNumber],[description],[rev],
              [status],[type],[transmittalid]) VALUES 
              (@docNumber,@description,@rev,@status,@type,@transmittalid) `);//sp InsertOrders  
              return detail.rowsAffected; 
    }
    catch (err) {
      console.log(err);
    }
}
async function deleteTransmittalDetail(transmittalid) {
  try {
      let pool = await sql.connect(config);
      let deleteTransmittal = await pool.request()
          .input('id', sql.Int, transmittalid)          
          .execute('DELETETRANSMITTAL_DETAIL');
      return deleteTransmittal.rowsAffected;
  }
  catch (err) {
      console.log(err);
  }

}
//delete
router.delete('/api/Transmittal/:id', async (req, res) => {
  const id  = req.params.id;
    try {
      let pool = await sql.connect(config);
      let deleteTransmittal = await pool.request()
          .input('id', sql.Int, id)          
          .execute('DELETETRANSMITTAL');   
      return  res.status(200).send({message:`Record deleted successfully !`});          
  }
  catch (error) {
    return  res.status(500).send({message: "Oops Something went wrong",error:error.message}); 
  } 
});
module.exports = router;
