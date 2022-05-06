import {getAll,getById,deleteRec, save, update} from '../apis/rolesApi';

export const getAllRoles=async()=>{
    try {
        const resp=await getAll();
        if(resp.data.status==200){            
            return {success:true,data:resp.data.data};
        }else{
            return {error:true,errorMessage:resp.data.errorMessage};
        }
    }catch(ex){
        const errorObject=ex;
		const errorMessage=errorObject.message;
		return {error:true,errorMessage:errorMessage}
    }
}
export const saveRole=async(data)=>{
    try{
        const resp=await save(data);
        if(resp.status===200){
            return{status:resp.data.statusCode, message:resp.data.statusTest};
        } else{
            return{status:resp.status, errorMessage:resp.data.message, error:resp.data.error};
        }
    }catch(ex){
        const errorObject=ex;
        return{status:null, errorMessage:errorObject.message, error:errorObject}
    }
}
export const updateRole=async(data)=>{
    try{
        const resp=await update(data);
        if(resp.status===200){
            return{status:resp.status, message:resp.data.statusTest};
        } else{
            return{status:resp.status, errorMessage:resp.data.message, error:resp.data.error};
        }
    }catch(ex){
        const errorObject=ex;
        return{status:null, errorMessage:errorObject.message, error:errorObject}
    }
}