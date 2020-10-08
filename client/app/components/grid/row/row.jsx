import React from 'react';
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

export default Row;
