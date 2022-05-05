import React, {useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton, Fade } from '../components/common/Toast';
import is from 'is_js';
import loadable from '@loadable/component';
import { AuthProvider } from '../context';
import {ModulesProvider} from './../context/modulesContext'
import AppRoutes from './AppRoutes';
import Error404 from '../components/errors/Error404';
import Home from '../components/pages/home';

const Login=loadable(()=>import('../components/pages/auth/login'));

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
		path: '/*',
		component: Home,
		isPrivate: true,
	},
];

const Layout = (props) => {
   // let devRespData = {};
   const HTMLClassList = document.getElementsByTagName('html')[0].classList;

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  useEffect(() => {
    Login.preload();
  }, []);

  return (<AuthProvider>
	  <ModulesProvider>
    <Router>
      <Switch>
      {routes.map((route) => (
						<AppRoutes {...props}
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/>
					))} 
      </Switch>
      <ToastContainer transition={Fade} closeButton={<CloseButton />} position={toast.POSITION.TOP_CENTER} />
    </Router>
	</ModulesProvider>
  </AuthProvider>);
};

export default Layout;
