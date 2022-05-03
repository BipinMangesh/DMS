import React, { useReducer } from 'react';
import { initialState, ModulesReducer } from '../reducers/modulesReducer';
import {getItemFromSessionStore} from '../helpers/utils'

const ModulesStateContext = React.createContext();
const ModulesDispatchContext = React.createContext();

export function useModulesState() {
	const context = React.useContext(ModulesStateContext);
	try{	
		if (context === undefined) {
			throw new Error('useModuleState must be used within a ModulesProvider');
		}
		return context;
		
	}catch(ex){
		return context;
	}
}

export function useModulesDispatch() {	
	const context = React.useContext(ModulesDispatchContext);
	if (context === undefined) {
		throw new Error('useModulesDispatch must be used within a ModulesProvider');
	}

	return context;
}

export const ModulesProvider = ({ children }) => {
	const [data, dispatch] = useReducer(ModulesReducer, initialState);

	return (
		<ModulesStateContext.Provider value={data}>
			<ModulesDispatchContext.Provider value={dispatch}>
				{children}
			</ModulesDispatchContext.Provider>
		</ModulesStateContext.Provider>
	);
};