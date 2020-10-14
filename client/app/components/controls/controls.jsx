import React from 'react';
import PropTypes from 'prop-types';
import styles from './controls.scss';
import { Row, Column } from '../grid';
import Button from '../button';
import {
  leftControlsProps,
  rightControlsProps,
  bottomControlsProps,
} from './control-collection';

const Controls = (props) => (
  <div className={styles.controls}>
    <Row row>
      <Column>
        <Row row wrap>
          {leftControlsProps.map((item) => (
            <Column key={item.id}>
              <Button
                id={item.id}
                type={item.type}
                value={item.value}
                display={item.display}
                theme={item.theme}
                onClick={props.onButtonClick}
                size={item.size}
              />
            </Column>
          ))}
        </Row>

        <Row row center>
          {bottomControlsProps.map((item) => {
            const isVat = item.value === 'set-vat';

            return (
              <Column key={item.id} center>
                <Button
                  id={item.id}
                  type={item.type}
                  value={item.value}
                  display={item.display}
                  theme={item.theme}
                  onClick={props.onButtonClick}
                  vatPercent={isVat && props.vatPercent}
                  size={item.size}
                />
              </Column>
            );
          })}
        </Row>
      </Column>

      <Column>
        <Row column>
          {rightControlsProps.map((item) => {
            const isActive = item.value === props.operation;
            return (
              <Column key={item.id} center>
                <Button
                  id={item.id}
                  active={isActive}
                  type={item.type}
                  value={item.value}
                  display={item.display}
                  theme={item.theme}
                  onClick={props.onButtonClick}
                  size={item.size}
                />
              </Column>
            );
          })}
        </Row>
      </Column>
    </Row>
  </div>
);

Controls.propTypes = {
  onButtonClick: PropTypes.func,
  vatPercent: PropTypes.number,
  operation: PropTypes.string,
};

export default Controls;
