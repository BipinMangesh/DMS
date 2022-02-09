import React, {useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import loadable from '@loadable/component';
import { AuthProvider } from '../context';
import AppRoutes from './AppRoutes';
import Error404 from '../components/errors/Error404';
import Home from '../components/pages/home'

const Login=loadable(()=>import('../components/pages/login'));

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
	},
  {
		path: '/404',
		component: Error404,
		isPrivate: false,
	},
  
  {
		path: '/forgotPassword',
		component: ()=><div>forgotPassword</div>,
		isPrivate: false,
	},
	 {
		path: '/',
		component: Home,
		isPrivate: true,
	},
	  
	 {
		path: '/*',
		component: Home,
		isPrivate: true,
	},
];

const Layout = () => {
   // let devRespData = {};
  useEffect(() => {
    Login.preload();
  }, []);

  return (<AuthProvider>
    <Router>
      <Switch>
      {routes.map((route) => (
						<AppRoutes
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/>
					))} 
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.TOP_CENTER} />
    </Router>
  </AuthProvider>);
};

export default Layout;
