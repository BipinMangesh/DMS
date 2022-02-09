import React, { useState, useReducer } from 'react';


export const initialState = {
	authInfo: undefined ,
	loading: false,
	errorMessage: undefined,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				authInfo: action.payload.authInfo,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				authInfo: undefined,
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};