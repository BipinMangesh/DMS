import React, { useContext } from 'react';
import { Button, Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import ProfileDropdown from './ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context';
import classNames from 'classnames';
import { navbarBreakPoint } from '../../config';

const TopNavRightSideNavItem = (props) => {
  const { isTopNav, isCombo, isDark, setIsDark } = useContext(AppContext);
  return (
    <Nav navbar className="navbar-nav-icons ml-auto flex-row align-items-center">
      <NavItem className={classNames(`p-2 px-lg-0 cursor-pointer`, { [`d-${navbarBreakPoint}-none`]: isCombo })}>
      <NavLink id="themeControlToggle"
          className="px-2 theme-control-toggle"
          onClick={() => setIsDark(!isDark)}
        >
          <FontAwesomeIcon
                icon={isDark ? 'sun' : 'moon'}
                className="fs-0"
              />
          <UncontrolledTooltip autohide={false} placement="left" target="themeControlToggle">
            {`Switch to ${isDark?'light theme' :'dark theme'}`}
          </UncontrolledTooltip>
        </NavLink>
        </NavItem>
      <ProfileDropdown {...props}  />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
