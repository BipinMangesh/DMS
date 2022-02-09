import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../context';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
	const {authInfo} = useAuthState();
	return (
		<Route
			path={path}
			render={(props) =>
				isPrivate && !Boolean((authInfo||{}).access_token) ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					<Component {...props} />
				)
			}
			{...rest}
		/>
	);
};

export default AppRoutes;