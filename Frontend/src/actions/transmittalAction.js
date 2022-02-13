
import {getAll,getById, saveAndUpdate,deleteRec} from '../apis/transmittalApi'
import {data} from '../components/pages/transmittals/testData';
export const getAllTransmittals=async(dispatch)=>{
    try {
        dispatch({ type: 'REQUEST_PROCESS' });       
        const formatedData=prepareFormatList(data);
        const resp={data:[...formatedData]}
        if(resp.data){
            await dispatch({ type: 'FETCH_ALL_DATA', payload: resp.data });
            return {error:false};
        }else{
            const errorMsg='Something went wrong';
            dispatch({ type: 'FETCH_ERROR', error:errorMsg  });
            return {error:true,errorMessage:errorMsg};
        }
    }catch(ex){
        const errorObject=ex.toJSON();
		const errorMessage=errorObject.message;		
		await dispatch({ type: 'FETCH_ERROR', error:errorMessage  });
		return {error:true,error:errorMessage}
    }
}
const prepareFormatList=(list)=>{
    const formatedData=[];
        const groupByTrIds=groupBy(list,'transmittalid');
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
                            "docNumbe": rec.docNumbe,
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
        const record=prepareFormatList(data).find(rec=>{
            return rec.transmittalid==id
        })
        const resp={data:{...(record||{})}}
        if(resp.data){
            await dispatch({ type: 'FETCH_REC', payload: resp.data });
            return {error:false};
        }else{
            const errorMsg='Something went wrong';
            dispatch({ type: 'FETCH_ERROR', error:errorMsg  });
            return {error:true,errorMessage:errorMsg};
        }
    }catch(ex){
        const errorObject=ex.toJSON();
		const errorMessage=errorObject.message;		
		await dispatch({ type: 'FETCH_ERROR', error:errorMessage  });
		return {error:true,error:errorMessage}

    }
}
export const clearRecord=(dispatch)=>{
    dispatch({ type: 'CLEAR_REC'  });
}

const  groupBy=(list, props)=> {
    return list.reduce((a, b) => {
       (a[b[props]] = a[b[props]] || []).push(b);
       return a;
    }, {});
  }