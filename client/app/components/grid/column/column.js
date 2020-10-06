import React from 'react';
import styles from './column.scss';

import classnames from 'classnames/bind'

const cx = classnames.bind(styles);

const Column = (props) => {
  const {children, grow, shrink, center} = props;

  return (
    <div 
      className = {cx('grid__item',{
        'grid__item--grow' : grow,
        'grid__item--shrink': shrink,
        'grid__item--center': center,       
        
      })}
    >
      {children}
    </div>
  )
}

export default Column;