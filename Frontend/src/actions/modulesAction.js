import {getModuleListApi} from '../apis/modulesApi';
export const getAllModules=async(dispatch,uid)=>{
    try {
        dispatch({ type: 'REQUEST_PROCESS' });   
        const resp=await getModuleListApi({uId:uid});
        if(resp.status==200){
            await dispatch({ type: 'FETCH_ALL_DATA', payload:formatModuleItems( [...resp.data.MenuListData||[]]) });
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

const formatModuleItems = (arr, parent=0) => {
    return arr.filter(item => item.ParentModuleID === parent)
        .reduce((acc, item) => {
            acc.push({...item, children: formatModuleItems(arr, item.ModuleID)});
            return acc;
        }, []);
};