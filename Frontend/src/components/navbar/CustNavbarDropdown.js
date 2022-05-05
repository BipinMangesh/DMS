import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Dropdown } from 'reactstrap';
import AuthCornerImage from '../../assets/img/illustrations/authentication-corner.png';
import { breakpoints, routesSlicer } from '../../helpers/utils';
import { topNavbarBreakpoint } from '../../config';

const CustNavbarDropdown = ({ title, parentItem, items, right, children, handleSetNavbarCollapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const findTitleName = name => {
    return items.find(routes => {
      if (routes.children) {
        return routes?.children.some(item => {
          return item.name === name;
        });
      }
      return routes.name === name;
    }).name;
  };

  const getTitle = (navItem, index) => {
    if (navItem.ModuleName === 'Inbox') {
      return findTitleName(navItem.ModuleName);
    }
    if (navItem.ModuleName === 'Product list') {
      return findTitleName(navItem.ModuleName);
    }
    if (navItem.ModuleName === 'Login') {
      return items[index].name;
    }
    if (navItem.ModuleName === 'Wizard') {
      return 'Special';
    }
  };

  const navItemGroup =
    title !== 'Home' &&
    routesSlicer({
      routes: items,
      rows: title === 'Authentication' && 7
    });

  return (
    <Dropdown
      nav
      inNavbar
      isOpen={dropdownOpen}
      toggle={toggleDropdown}
      onMouseOver={() => {
        let windowWidth = window.innerWidth;
        if (windowWidth >= breakpoints[topNavbarBreakpoint]) {
          setDropdownOpen(true);
        }
      }}
      onMouseLeave={() => {
        let windowWidth = window.innerWidth;
        if (windowWidth >= breakpoints[topNavbarBreakpoint]) {
          setDropdownOpen(false);
        }
      }}
    >
      <DropdownToggle nav caret>
        {title}
      </DropdownToggle>
      <DropdownMenu right={right} className="dropdown-menu-card mt-0">
        {items.length > 0 && (
          <Card
            className={classNames('shadow-none max-h-dropdown', {
              'navbar-card-pages': title === 'Pages',
              'navbar-card-auth': title === 'Authentication'
            })}
          >
            {title === 'Authentication' && (
              <img src={AuthCornerImage} alt="" className="position-absolute b-0 r-0" width={130} />
            )}
            <CardBody className={classNames('scrollbar px-0 py-2', { 'p-0': true })}>
              <div className="nav flex-column">
                {true ? (
                  items.map(({ Url, ModuleName }, index) => (
                    <DropdownItem tag={Link} to={`/${parentItem.Url}/${Url}` } key={index} onClick={handleSetNavbarCollapsed}>
                      {ModuleName}
                    </DropdownItem>
                  ))
                ) : (
                  <Row noGutters>
                    {navItemGroup.map((groupItem, index) => {
                      return (
                        <Col
                          xs={6}
                          key={index}
                          className={classNames('col-xl-3', {
                            'col-xl-4': title === 'Pages',
                            'col-xxl-3 col-xl-6  mb-xxl-0 mb-3': title === 'Authentication'
                          })}
                        >
                          {groupItem.map((navItem, i) => {
                            const title =navItem.ModuleName; //getTitle(navItem, index);

                            return (
                              <Fragment key={`${index}-${i}`}>
                                {title && <div className="nav-link  py-1 text-900 font-weight-bold">{title}</div>}
                                <DropdownItem tag={Link} to={`/${navItem.Url}` } key={i} onClick={handleSetNavbarCollapsed}>
                                  {navItem.ModuleName}
                                  {navItem.badge && (
                                    <Badge color={navItem.badge.color || 'soft-success'} pill className="ml-2">
                                      {navItem.badge.text}
                                    </Badge>
                                  )}
                                </DropdownItem>
                              </Fragment>
                            );
                          })}
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </div>
            </CardBody>
          </Card>
        )}
        {children}
      </DropdownMenu>
    </Dropdown>
  );
};

CustNavbarDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  handleSetNavbarCollapsed: PropTypes.func,
  children: PropTypes.node,
  items: PropTypes.array,
  right: PropTypes.bool
};

CustNavbarDropdown.defaultProps = {
  items: [],
  right: false,
  children: null
};

export default CustNavbarDropdown;
