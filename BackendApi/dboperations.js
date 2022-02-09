var config = require('./dbconfig');
const sql = require('mssql');




async function getTransmittals() {
    try {
        let pool = await sql.connect(config);
        let Transmittals = await pool.request().query("select t.*,transmittalDetailid,docNumbe,description,rev,status,type from Transmittal t  inner join transmittalDetail d on t.transmittalid=d.transmittalid");       
       return Transmittals.recordsets
    }
    catch (error) {
        console.log(error);
    }
}

async function getTransmittal(transmittalid) {
    try {
        let pool = await sql.connect(config);
        let Transmittal = await pool.request()
            .input('input_parameter', sql.Int, transmittalid)
            .query("select t.*,transmittalDetailid,docNumbe,description,rev,status,type from Transmittal t  inner join transmittalDetail d on t.transmittalid=d.transmittalid where t.transmittalid = @input_parameter");
        return Transmittal.recordset;

    }
    catch (error) {
        console.log(error);
    }
}


async function addEditTransmittal(Transmittal) {  
  
    try {

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
            .query(' INSERT INTO [dbo].[Transmittal] ([wonNo],[wonTitle] ,[transmittalNo],[date],[from],[to]) VALUES (@wonNo ,@wonTitle ,@transmittalNo ,@date  ,@from ,@to) SELECT SCOPE_IDENTITY() AS transmittalid');//sp InsertOrders
          let pkid=  insertaTransmittal.recordsets.transmittalid;
          detail.map( item =>{
           console.log("Item",item);
            let pool = await sql.connect(config);
            let insertaTransmittalDetail = await pool.request()
                .input('docNumbe', sql.NVarChar, item.docNumber)
                .input('description', sql.NVarChar, item.description)
                .input('rev', sql.NVarChar, item.rev)
                .input('status', sql.NVarChar, item.status)
                .input('type', sql.NVarChar, item.type)
                .input('transmittalid', sql.Int, pkid)             
                .query('INSERT INTO [dbo].[transmittalDetail] ([docNumber],[description],[rev],[status],[type],[transmittalid]) VALUES (@docNumbe,@description,@rev,@status,@type,@transmittalid) ');//sp InsertOrders
                insertaTransmittalDetail.recordset;
          });
          return pkid;
    }
    catch (err) {
        console.log(err);
    }

}

async function deleteTransmittal(transmittalid) {

    try {
        let pool = await sql.connect(config);
        let deleteTransmittal = await pool.request()
            .input('transmittalid', sql.Int, transmittalid)          
            .query('sp_DeleteTransmittal');//sp InsertOrders
        return deleteTransmittal.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}



module.exports = {
    getTransmittals: getTransmittals,
    getTransmittal: getTransmittal,
    addEditTransmittal : addEditTransmittal,
    deleteTransmittal : deleteTransmittal
}