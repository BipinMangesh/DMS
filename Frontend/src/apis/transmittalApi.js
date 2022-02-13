import service from './../server/request';
export const getAll=()=>{
    return service({
        method:'get',
        url:'/Transmittals',
    })
}
export const getById=(id)=>{
    return service({
        method:'get',
        url:`/Transmittal/${id}`,
    })
}
export const saveAndUpdate=(reqObj)=>{
    return service({
        method:'post',
        url:'/Transmittal',
        data:reqObj
    })
}
export const deleteRec=(recId)=>{
    return service({
        method:'delete',
        url:`/Transmittal/${recId}`,
    })
}