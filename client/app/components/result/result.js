import React from 'react';
import styles from './result.scss';
import {Row, Column} from '../grid';

const Result = ({ value }) => {
  return (
    <div className = {styles.result}>
      <Row column end wrap>
        <Column center>
          {value}
        </Column>
      </Row>
    </div>
  );
};

export default Result;