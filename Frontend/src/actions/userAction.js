import {getAll,getById, saveAndUpdate,deleteRec} from '../apis/userApi';

export const getAllUsers=async()=>{
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