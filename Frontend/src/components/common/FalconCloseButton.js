import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CloseButton } from 'react-bootstrap';
import classNames from 'classnames';

const FalconCloseButton = ({
  size,
  onClick,
  noOutline,
  variant,
  className,
  ...rest
}) => {
  
  return (
    <CloseButton
      variant={variant ? variant :undefined}
      className={classNames(className, {
        [`btn-${size}`]: size,
        'outline-none': noOutline
        // [className]: className
      })}
      onClick={onClick && onClick}
      {...rest}
    />
  );
};

FalconCloseButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  noOutline: PropTypes.bool,
  variant: PropTypes.string, // use 'white' for white variant
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default FalconCloseButton;
