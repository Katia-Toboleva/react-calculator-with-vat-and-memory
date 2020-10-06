import React from 'react';
import styles from './row.scss';

import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

const Row = (props) => {
  const {children, row, column, center, wrap, end} = props;

  return (
    <div className = {cx('grid', {
      'grid--row' : row,
      'grid--column' : column,
      'grid--position-center' : center,
      'grid--position-end' : end,
      'grid--wrap' : wrap,
    })}
    >
      {children}
    </div>
  )
}



export default Row;
