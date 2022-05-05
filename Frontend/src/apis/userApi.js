import service from './../server/request';
export const getAll=()=>{
    return service({
        method:'get',
        url:'/User/GetUserList',
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
        url:`/Role/${recId}`,
    })
}