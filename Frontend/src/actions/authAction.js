import  {getAccessToken, login} from '../server/request';
import {setItemToSessionStore} from '../helpers/utils'

export const loginUser= async(dispatch,loginPayload)=>{    
	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		const resp=await getAccessToken({userName:loginPayload.userName, password:loginPayload.password});
		//const resp={data:{authInfo:{access_token:'sfsdsdffs-sdfsdf-sdsdf-'}}}
		if(resp.data){
				const _payload={authInfo:resp.data}
				await dispatch({ type: 'LOGIN_SUCCESS', payload: _payload });
				setItemToSessionStore('currentUser', JSON.stringify(_payload));
				return _payload;
		}else{
			dispatch({ type: 'LOGIN_ERROR', error: 'Invalid Username/password' });
			return undefined;
		}
	} catch (error) {
		const errorObject=error.toJSON();
		const errorMessage=errorObject.message==='Request failed with status code 401'?'Invalid Username/Password':errorObject.message;		
		await dispatch({ type: 'LOGIN_ERROR', error:errorMessage  });
		return {error:true,errorMessage}
	}
}

export const logout=(dispatch)=>{
	try{
		setItemToSessionStore('currentUser', JSON.stringify({}));
	}catch(ex){
	}
	return true
}