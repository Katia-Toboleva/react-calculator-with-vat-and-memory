import React from 'react';
import classnames from 'classnames/bind';
import styles from './column.scss';

const cx = classnames.bind(styles);

const Column = (props) => {
  const {
    children, grow, shrink, center,
  } = props;

  return (
    <div
      className={cx('grid__item', {
        'grid__item--grow': grow,
        'grid__item--shrink': shrink,
        'grid__item--center': center,

      })}
    >
      {children}
    </div>
  );
};

export default Column;
