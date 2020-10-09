import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './row.scss';

const cx = classnames.bind(styles);

const Row = (props) => {
  const {
    children, row, column, center, wrap, end,
  } = props;

  return (
    <div className={cx('grid', {
      'grid--row': row,
      'grid--column': column,
      'grid--position-center': center,
      'grid--position-end': end,
      'grid--wrap': wrap,
    })}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  row: PropTypes.bool,
  column: PropTypes.bool,
  center: PropTypes.bool,
  wrap: PropTypes.bool,
  end: PropTypes.bool,
};

export default Row;
