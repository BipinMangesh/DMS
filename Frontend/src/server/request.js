import axios from "axios";
import {BASE_URL} from './constants';
//import { getToken, getRefreshToken } from "../utils/auth";


const service = axios.create({
  baseURL: BASE_URL, // api base_url
  //timeout: 5000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    //if (store.getState().user.token) {
      if(access_token()){
        if(config.url.split('?').length===1){
          config.url=`${config.url}?access_token=${access_token()}`;
        }else{
          config.url=`${config.url}&access_token=${access_token()}`;
        }
      //config.headers.Authorization = getToken();
      //config.headers['access_token'] = access_token();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.log("err" + error); // for debug
    const { status } = error.response;
    if (status === 401) {
      if(error.response.config.url==='/login'){
        return;
      }
      let refresh_token = sessionStorage.getItem('refresh_token')
      if(refresh_token){
        return new Promise((resolve)=> getTokenByRefreshToken(refresh_token).then((res)=>{
          console.log('refresh_token Info:', res)
          if(res.status!==200){
              sessionStorage.clear();
              window.location.replace('/login');
           }else{
              sessionStorage.setItem('access_token', res.data.access_token);
              sessionStorage.setItem('refresh_token', res.data.refresh_token);
              const {config}=error;
              let url=config.url;
              config.url=url.replace(url.split('&').pop(),'access_token='+res.data.access_token);
              return resolve(service(config));
           }
        }));
      }else{
        sessionStorage.clear();
        window.location.replace('/login');
      }
    }else{
      return Promise.reject(error.toJSON());
    }
  }
);

const getTokenByRefreshToken=(refresh_token)=>{
  return axios({
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('my-trusted-client:secret'),
      'Content-Type': 'application/x-www-form-urlencoded'
  },
    url:`${BASE_URL}/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`,
  })

}

const access_token=()=>{
  return ''
}
export default service;


export const getAccessToken=({userName, password})=> {
  let promise = axios({
    url:`${BASE_URL}/Auth/Login`,
    method: 'POST',
    // headers: {
    //   'Authorization': 'Basic ' + btoa('my-trusted-client:secret'),
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data:{
        "EmailId":userName ,
        "Password":password
      }
  });
  return promise;
}

export const login=({token})=>{
  let d = new Date();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  let promise = axios({
    url:`${BASE_URL}/login/${0}?currentDate=${[year, month, day].join('-')}&access_token=${token}`,
    method:'get'
  });
  return promise;
}

