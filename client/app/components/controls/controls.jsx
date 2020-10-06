import React from 'react';
import styles from './controls.scss';
import { Row, Column } from '../grid';
import { Button } from '../button';

const leftControlsProps = [
  {
    id: 0,
    type: 'function',
    value: 'clear-all',
    display: 'AC',
    theme: 'dark',
  },
  {
    id: 1,
    type: 'function',
    value: 'clear',
    display: 'C',
    theme: 'dark',
  },
  {
    id: 2,
    type: 'function',
    value: 'convert',
    display: '+/-',
    theme: 'dark',
  },
  {
    id: 3,
    type: 'function',
    value: 'percent',
    display: '%',
    theme: 'dark',
  },
  {
    id: 4,
    type: 'function',
    value: 'memo-save',
    display: 'MS',
    theme: 'dark',
  },
  {
    id: 5,
    type: 'num',
    value: 7,
    display: '7',
    theme: 'light',
  },
  {
    id: 6,
    type: 'num',
    value: 8,
    display: '8',
    theme: 'light',
  },
  {
    id: 7,
    type: 'num',
    value: 9,
    display: '9',
    theme: 'light',
  },
  {
    id: 8,
    type: 'function',
    value: 'memo-rec',
    display: 'MR',
    theme: 'dark',
  },
  {
    id: 9,
    type: 'num',
    value: 4,
    display: '4',
    theme: 'light',
  },
  {
    id: 10,
    type: 'num',
    value: 5,
    display: '5',
    theme: 'light',
  },
  {
    id: 11,
    type: 'num',
    value: 6,
    display: '6',
    theme: 'light',
  },
  {
    id: 12,
    type: 'function',
    value: 'memo-add',
    display: 'M+',
    theme: 'dark',
  },
  {
    id: 13,
    type: 'num',
    value: 1,
    display: '1',
    theme: 'light',
  },
  {
    id: 14,
    type: 'num',
    value: 2,
    display: '2',
    theme: 'light',
  },
  {
    id: 15,
    type: 'num',
    value: 3,
    display: '3',
    theme: 'light',
  },
  {
    id: 16,
    type: 'function',
    value: 'memo-subtract',
    display: 'M-',
    theme: 'dark',
  },
  {
    id: 17,
    type: 'num',
    value: 0,
    display: '0',
    theme: 'light',
  },
  {
    id: 18,
    type: 'function',
    value: '00',
    display: '00',
    theme: 'light',
  },
  {
    id: 19,
    type: 'function',
    value: 'dot',
    display: '.',
    theme: 'light',
  },
];

const rightControlsProps = [
  {
    id: 1,
    type: 'operation',
    value: 'divide',
    display: '/',
    theme: 'gray',
  },
  {
    id: 2,
    type: 'operation',
    value: 'multiply',
    display: 'X',
    theme: 'gray',
  },
  {
    id: 3,
    type: 'operation',
    value: 'subtract',
    display: '-',
    theme: 'gray',
  },
  {
    id: 4,
    type: 'operation',
    value: 'add',
    display: '+',
    theme: 'gray',
  },
  {
    id: 5,
    type: 'function',
    value: 'equals',
    display: '=',
    theme: 'bright',
    size: 'big',
  },
];

const bottomControlsProps = [
  {
    id: 1,
    type: 'function',
    value: 'set-vat',
    display: 'VAT%',
    theme: 'gray',
  },
  {
    id: 2,
    type: 'function',
    value: 'without-vat',
    display: '- VAT',
    theme: 'dark',
    size: 'medium',
  },
  {
    id: 3,
    type: 'function',
    value: 'add-vat',
    display: '+ VAT',
    theme: 'dark',
    size: 'medium',
  },
];

const Controls = (props) => {
  return (
    <div className={styles.controls}>
      <Row row center>
        <Column>
          <Row row center wrap>
            {leftControlsProps.map((item) => {
              return (
                <Column key={item.id} center grow>
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
              );
            })}
          </Row>

          <Row row center>
            {bottomControlsProps.map((item) => {
              const isVat = item.value === 'set-vat';

              return (
                <Column key={item.id} center grow>
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
                <Column key={item.id} center grow>
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
};

export default Controls;
