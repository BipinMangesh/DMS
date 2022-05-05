import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Navbar, NavItem, Nav } from 'reactstrap';
import classNames from 'classnames';
import AppContext from '../../context/Context';
import Logo from './Logo';
import SearchBox from './SearchBox';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import NavbarTopDropDownMenus from './NavbarTopDropDownMenus';
import { topNavbarBreakpoint } from '../../config';


const NavbarTop = (props) => {
  const {
    isTopNav,
    navbarCollapsed,
    setNavbarCollapsed
  } = useContext(AppContext);
  const [showDropShadow, setShowDropShadow] = useState(false);

  const setDropShadow = () => {
    const el = document.documentElement;
    if (el.scrollTop > 0) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  return (
    <Navbar
      light
      //className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit"
      className={classNames('navbar-glass  fs--1 navbar-top sticky-kit', {
        // 'navbar-glass-shadow': showDropShadow
        'navbar-glass-shadow': showDropShadow 
      })}
      expand={isTopNav && topNavbarBreakpoint}
    >
     
     <Logo at="navbar-top" width={40} id="topLogo" />
      {isTopNav ? (
        <Collapse navbar isOpen={navbarCollapsed} className="scrollbar">
          <Nav navbar>
            <NavbarTopDropDownMenus {...props} setNavbarCollapsed={setNavbarCollapsed} />
          </Nav>
        </Collapse>
      ) : (
        <Nav navbar className={`align-items-center d-none d-${topNavbarBreakpoint}-block`}>
          <NavItem>
            {/* <SearchBox autoCompleteItem={autoCompleteInitialItem} /> */}
          </NavItem>
        </Nav>
      )}
      

      <TopNavRightSideNavItem {...props}/>
    </Navbar>
  );
};

export default NavbarTop;