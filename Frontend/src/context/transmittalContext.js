import React, { useReducer } from 'react';
import { initialTransmittalState, TransmittalReducer } from '../reducers/transmittalReducer';
import {getItemFromSessionStore} from '../helpers/utils'

const TransmittalStateContext = React.createContext();
const TransmittalDispatchContext = React.createContext();

export function useTransmittalState() {
	const context = React.useContext(TransmittalStateContext);
	try{	
		if (context === undefined) {
			throw new Error('useAuthState must be used within a AuthProvider');
		}
		return context;
		
	}catch(ex){
		return context;
	}
}

export function useTransmittalDispatch() {	
	const context = React.useContext(TransmittalDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const TransmittalProvider = ({ children }) => {
	const [data, dispatch] = useReducer(TransmittalReducer, initialTransmittalState);

	return (
		<TransmittalStateContext.Provider value={data}>
			<TransmittalDispatchContext.Provider value={dispatch}>
				{children}
			</TransmittalDispatchContext.Provider>
		</TransmittalStateContext.Provider>
	);
};