import React, { useReducer } from 'react';
import { initialState, AuthReducer } from '../reducers/authReducer';
import {getItemFromSessionStore} from '../helpers/utils'

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	try{	
		if (context === undefined) {
			throw new Error('useAuthState must be used within a AuthProvider');
		}
		const currentUser=getItemFromSessionStore('currentUser',initialState);
		if(context.authInfo){
			return context;
		}else{
			return JSON.parse(currentUser);
		}
	}catch(ex){
		return context;
	}
}

export function useAuthDispatch() {	
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const AuthProvider = ({ children }) => {
	const [authInfo, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={authInfo}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};