import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './column.scss';

const cx = classnames.bind(styles);
const Column = (props) => {
  const {
    children, grow, shrink, center,
  } = props;

  return (
    <div
      className={cx('grid-item', {
        'grid-item--grow': grow,
        'grid-item--shrink': shrink,
        'grid-item--center': center,

      })}
    >
      {children}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.node,
  grow: PropTypes.bool,
  shrink: PropTypes.bool,
  center: PropTypes.bool,
};

export default Column;
