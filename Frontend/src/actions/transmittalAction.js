
import {getAll,getById, saveAndUpdate,deleteRec} from '../apis/transmittalApi'
import {data} from '../components/pages/transmittals/testData';
export const getAllTransmittals=async(dispatch)=>{
    try {
        dispatch({ type: 'REQUEST_PROCESS' });       
       
        const resp=await getAll();
        if(resp.status==200){
             const formatedData=prepareFormatList(resp.data.data[0]||[]);
            await dispatch({ type: 'FETCH_ALL_DATA', payload: [...formatedData] });
            return {error:false};
        }else{
            dispatch({ type: 'FETCH_ERROR', error:resp.data.errorMessage  });
            return {error:true,errorMessage:resp.data.errorMessage};
        }
    }catch(ex){
        const errorObject=ex;
		const errorMessage=errorObject.message;		
		await dispatch({ type: 'FETCH_ERROR', error:errorMessage  });
		return {error:true,errorMessage:errorMessage}
    }
}
const prepareFormatList=(list)=>{
    const formatedData=[];
        const groupByTrIds= groupBy(list, 'transmittalid' ) ;
        Object.keys(groupByTrIds).map(key=>{
            if(groupByTrIds[key].length>0){
                const obj={
                    "transmittalid": key,
                    "wonNo": groupByTrIds[key][0].wonNo,
                    "wonTitle": groupByTrIds[key][0].wonTitle,
                    "transmittalNo": groupByTrIds[key][0].transmittalNo,
                    "date": groupByTrIds[key][0].date,
                    "from":groupByTrIds[key][0].from,
                    "to": groupByTrIds[key][0].to,
                    "transmittalDetails":groupByTrIds[key].map((rec,i)=>{
                        return {
                            'tdRecId':i+1,
                            "transmittalDetailid": rec.transmittalDetailid,
                            "docNumber": rec.docNumber,
                            "description": rec.description,
                            "rev": rec.rev,
                            "status": rec.status,
                            "type": rec.type
                        }
                    })
                }
                formatedData.push(obj);
            }
        });
        return formatedData;
}

export const getTransmittalRec=async(dispatch,id)=>{
    try {
        dispatch({ type: 'REQUEST_PROCESS' });
       await dispatch({ type: 'CLEAR_REC' });       
        const resp=await getById(id);
        if( resp.status==200){
            const formatedData=prepareFormatList(resp.data.data[0]||[])||[];
            await dispatch({ type: 'FETCH_REC', payload: (formatedData[0]||{})});
            return {error:false};
        }else{
            const errorMsg='Something went wrong';
            dispatch({ type: 'FETCH_ERROR', error:errorMsg  });
            return {error:true,errorMessage:errorMsg};
        }
    }catch(ex){
        const errorObject=ex;
		const errorMessage=errorObject.message;		
		await dispatch({ type: 'FETCH_ERROR', error:errorMessage  });
		return {error:true,errorMessage:errorMessage}

    }
}
export const clearRecord=(dispatch)=>{
    dispatch({ type: 'CLEAR_REC'  });
}

export const saveAndUpdateTransmittal=async(data)=>{
    try{
        const resp=await saveAndUpdate(data);
        if(resp.status===201){
            return{status:resp.status, message:resp.data.message};
        } else if(resp.status===200){
            return{status:resp.status, message:resp.data.message};
        }else{
            return{status:resp.status, errorMessage:resp.data.message, error:resp.data.error};
        }
    }catch(ex){
        const errorObject=ex;
        return{status:null, errorMessage:errorObject.message, error:errorObject.error}
    }

}
export const deleteTransmittal=async(id)=>{
    try{
        const resp=await deleteRec(id);
        if(resp.status===200){
            return{status:resp.status, message:resp.data.message};

        }else{
            return{status:resp.status, errorMessage:resp.data.message, error:resp.data.error}
        }

    }catch(ex){
        const errorObject=ex;
        return{status:null, errorMessage:errorObject.message, error:errorObject.error}

    }
}

const  groupBy=(list, props)=> {
    return list.reduce((a=[], b=[]) => {
        (a[b[props]] = a[b[props]] || []).push(b);
        return a;
     }, {});
  }