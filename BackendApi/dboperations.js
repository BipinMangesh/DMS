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
        let pool = await sql.connect(config);
        let insertaTransmittal = await pool.request()
            .input('transmittalid', sql.Int, Transmittal.transmittalid)
            .input('wonNo', sql.NVarChar, Transmittal.wonNo)
            .input('wonTitle', sql.Int, Transmittal.wonTitle)
            .input('transmittalNo', sql.NVarChar, Transmittal.transmittalNo)
            .input('date', sql.Date, Transmittal.date)
            .input('from', sql.NVarChar, Transmittal.from)
            .input('to', sql.NVarChar, Transmittal.to)
            .execute('sp_InsertTransmittal');//sp InsertOrders
        return insertaTransmittal.recordsets;
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
            .execute('sp_DeleteTransmittal');//sp InsertOrders
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