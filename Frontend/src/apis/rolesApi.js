import service from './../server/request';
export const getAll=()=>{
    return service({
        method:'get',
        url:'/Role/GetRoleList',
    })
}
export const save=(reqObj)=>{
    return service({
        method:'post',
        url:'/Role/CreateRole',
        data:reqObj
    })
}
export const update=(reqObj)=>{
    return service({
        method:'post',
        url:'/Role/UpdateRole',
        data:reqObj
    })
}
export const deleteRec=(recId)=>{
    return service({
        method:'delete',
        url:`/Role/${recId}`,
    })
}