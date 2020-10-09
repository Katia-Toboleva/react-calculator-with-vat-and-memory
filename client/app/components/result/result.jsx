import React from 'react';
import PropTypes from 'prop-types';
import styles from './result.scss';
import { Row, Column } from '../grid';

const Result = ({ value }) => (
  <div className={styles.result}>
    <Row column end wrap>
      <Column center>
        {value}
      </Column>
    </Row>
  </div>
);

Result.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Result;
