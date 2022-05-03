import React, { useState, useReducer } from 'react';
export const initialState = {
	data: undefined,
    rec:undefined,
	loading: false,
	errorMessage: undefined,
};

export const ModulesReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_PROCESS':
			return {
				...initialState,
				loading: true,
			};
		case 'FETCH_ALL_DATA':
			return {
				...initialState,
				data: action.payload,
				loading: false,
			};
		case 'FETCH_REC':
			return {
				...initialState,
				rec: action.payload,
			};
		case 'CLEAR_REC':
			return {
				...initialState,
				rec: action.payload,
			};

		case 'FETCH_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};