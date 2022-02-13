import service from './../server/request';
export const getAll=()=>{
    return service({
        method:'get',
        url:'/',
    })
}
export const getById=(id)=>{
    return service({
        method:'get',
        url:'/',
    })
}
export const saveAndUpdate=(reqObj)=>{
    return service({
        method:'post',
        url:'/',
        data:reqObj
    })
}
export const deleteRec=(recId)=>{
    return service({
        method:'delete',
        url:'/',
    })
}