import service from './../server/request';
export const getModuleListApi=({uId})=>{
    return service({
        method:'get',
        url:`/User/MenuList?userid=${uId}`,
    })
}