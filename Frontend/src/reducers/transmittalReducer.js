import React, { useState, useReducer } from 'react';
export const initialTransmittalState = {
	data: undefined,
    rec:undefined,
	loading: false,
	errorMessage: undefined,
};

export const TransmittalReducer = (initialTransmittalState, action) => {
	switch (action.type) {
		case 'REQUEST_PROCESS':
			return {
				...initialTransmittalState,
				loading: true,
			};
		case 'FETCH_ALL_DATA':
			return {
				...initialTransmittalState,
				data: action.payload,
				loading: false,
			};
		case 'FETCH_REC':
			return {
				...initialTransmittalState,
				rec: action.payload,
			};

		case 'FETCH_ERROR':
			return {
				...initialTransmittalState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};