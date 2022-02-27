import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import NavbarTop from '../../navbar/NavbarTop';
import NavbarVertical from '../../navbar/NavbarVertical';
import Footer from '../../footer/Footer';
import loadable from '@loadable/component';
import AppContext from '../../../context/Context';
import SidePanelModal from '../../side-panel/SidePanelModal';
import { getPageName } from '../../../helpers/utils';
import { TransmittalProvider } from '../../../context/transmittalContext'
import Dashboard from './dashboard';

const Transmittals=loadable(()=>import('./../transmittals'));
const ProjectFlowChart=loadable(()=>import('../projectflowchart'))
const Home = ({ location }) => {
    const { isFluid, isVertical, navbarStyle } = useContext(AppContext);
    const isKanban = getPageName('kanban');

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);
    
      return (
        <div className={isFluid || isKanban ? 'container-fluid' : 'container'}>
          {isVertical && <NavbarVertical isKanban={isKanban} navbarStyle={navbarStyle} />}
            <div className="content">
              <NavbarTop />
              <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/transmittals" render={()=><TransmittalProvider><Transmittals /></TransmittalProvider>} />
                <Route path="/projectflowchart" exact component={ProjectFlowChart} />
                <Route path="/" component={Dashboard} />
                
               {/*  <DashboardRoutes /> */}
              </Switch>
              {!isKanban && <Footer />}
            </div>
            {/* <SidePanelModal path={location.pathname} /> */}
        </div>
      );

}
Home.propTypes = { location: PropTypes.object.isRequired };
export default Home