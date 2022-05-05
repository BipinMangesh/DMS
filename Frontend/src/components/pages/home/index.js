import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import {logout} from './../../../actions/authAction'
import NavbarTop from '../../navbar/NavbarTop';
import NavbarVertical from '../../navbar/NavbarVertical';
import Footer from '../../footer/Footer';
import loadable from '@loadable/component';
import {useModulesState, useModulesDispatch } from './../../../context/modulesContext';
import AppContext from '../../../context/Context';
import { useAuthState } from '../../../context';
import SidePanelModal from '../../side-panel/SidePanelModal';
import Dashboard from './dashboard';
import { getAllModules } from '../../../actions/modulesAction';

const Admin = loadable(() => import('./../admin'));

const Home = (props) => {
  const { location }=props;
  const {authInfo}=useAuthState();
  const moduleDispatch=useModulesDispatch();
  const { isFluid, isVertical, navbarStyle } = useContext(AppContext);
  const moduleStateObj =useModulesState();
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    useEffect(()=>{
      getModules();
    },[])

    const getModules=async()=>{
      const {userId}=authInfo;
      await getAllModules(moduleDispatch,userId);
    }

    const onRightSideNavItemClick=(action)=>{
        switch(action){
          case 'LOGOUT':        
          logout();
            window.location.reload('/login');
          break;
          default:
            break;
        }
        return false;
      }
    
      return (
        <div className={isFluid ? 'container-fluid' : 'container'}>          
          {isVertical && <NavbarVertical navbarStyle={navbarStyle} />}
            <div className="content">
              <NavbarTop navbarItems={(moduleStateObj||{}).data||[]}
              onRightSideNavItemClick={(action)=>onRightSideNavItemClick(action)} {...props} />
  
              <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/admin" component={Admin} />
                <Route path="/" component={Dashboard} />

              </Switch>
               <Footer />
            </div>
            {/* <SidePanelModal path={location.pathname} /> */}            
        </div>
      );

}
Home.propTypes = { location: PropTypes.object.isRequired };
export default Home