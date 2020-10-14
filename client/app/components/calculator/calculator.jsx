import React from 'react';
import styles from './calculator.scss';
import { Row, Column } from '../grid';
import Controls from '../controls';
import Result from '../result';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savedNumber: 0,
      currentNumber: 0,
      operation: '',
      memoValue: 0,
      vatPercent: 20,
    };
  }

  calculateTotal() {
    const { currentNumber, savedNumber, operation } = this.state;
    let total;

    switch (operation) {
      case 'add': total = savedNumber + currentNumber; break;
      case 'multiply': total = savedNumber * currentNumber; break;
      case 'subtract': total = savedNumber - currentNumber; break;
      case 'divide': total = savedNumber / currentNumber; break;
      default: total = currentNumber; break;
    }

    return total;
  }

  calculatePercent() {
    const { currentNumber, savedNumber, operation } = this.state;

    if (savedNumber && currentNumber && operation !== 'multiply' && operation !== 'divide') {
      return ((currentNumber * savedNumber) / 100);
    }

    return currentNumber * 0.01;
  }

  convertNumber() {
    const { currentNumber, savedNumber, operation } = this.state;

    if (operation === undefined && savedNumber !== 0 && currentNumber === 0) {
      return savedNumber * -1;
    }

    if (operation === undefined && savedNumber !== 0 && currentNumber !== 0) {
      return currentNumber * -1;
    }

    if (currentNumber === 0) {
      return `-${0}`;
    }

    if (operation !== undefined && !currentNumber) {
      return `-${0}`;
    }

    if (operation !== undefined && currentNumber) {
      return currentNumber * -1;
    }

    return savedNumber * -1;
  }

  recordValue() {
    const { currentNumber, savedNumber } = this.state;

    if (savedNumber) {
      return savedNumber;
    }

    return currentNumber;
  }

  concatenateDisplayValues(value) {
    const { currentNumber } = this.state;
    const num = (currentNumber === 0)
      ? value
      : `${currentNumber}${value}`;
    return num;
  }

  handleNumber(type, value) {
    return {
      currentNumber: Number(this.concatenateDisplayValues(value)),
    };
  }

  handleOperation(currentNumber, savedNumber, value) {
    if (currentNumber && savedNumber) {
      return {
        currentNumber: 0,
        savedNumber: Number.parseFloat((this.calculateTotal()).toFixed(5)),
        operation: value,
      };
    }

    if (savedNumber && !currentNumber) {
      return {
        currentNumber: 0,
        savedNumber: Number.parseFloat((savedNumber).toFixed(5)),
        operation: value,
      };
    }

    return {
      currentNumber: 0,
      savedNumber: Number.parseFloat((currentNumber).toFixed(5)),
      operation: value,
    };
  }

  handleClearC() {
    return {
      currentNumber: '0',
    };
  }

  handleClearAll() {
    return {
      savedNumber: 0,
      currentNumber: 0,
      memoValue: 0,
      vatPercent: 20,
      operation: '',
    };
  }

  handleConvert() {
    return {
      currentNumber: this.convertNumber(),
    };
  }

  handleMemoSave() {
    return {
      memoValue: this.recordValue(),
    };
  }

  handleMemoAdd(memoValue, savedNumber) {
    return {
      savedNumber: memoValue + savedNumber,
    };
  }

  handleMemoSubtract(memoValue, savedNumber) {
    return {
      savedNumber: memoValue - savedNumber,
    };
  }

  handleMemoRec(memoValue) {
    return {
      currentNumber: memoValue || 0,
    };
  }

  handlePercent() {
    return {
      currentNumber: parseFloat((this.calculatePercent()).toFixed(5)),
    };
  }

  handleDot(currentNumber) {
    return {
      currentNumber: `${currentNumber}.`,
    };
  }

  handleDoubleZero(type, currentNumber) {
    return {
      currentNumber: Number(`${currentNumber}00`),
    };
  }

  handleSetVat(vatPercent) {
    return {
      vatPercent: this.recordValue(),
      currentNumber: vatPercent,
    };
  }

  handleAddVat(vatPercent, currentNumber) {
    return {
      currentNumber: parseFloat((currentNumber * Number(`1.${vatPercent}`)).toFixed(2)),
    };
  }

  handleWithoutVat(vatPercent, currentNumber) {
    const vat = ((currentNumber / Number(`1.${vatPercent}`)) - currentNumber) * -1;

    return {
      currentNumber: Number((currentNumber - vat).toFixed(2)),
    };
  }

  handleEquals() {
    return {
      currentNumber: 0,
      savedNumber: parseFloat((this.calculateTotal()).toFixed(5)),
      operation: undefined,
    };
  }

  handleButtonClick(type, value) {
    const {
      currentNumber, savedNumber, memoValue, vatPercent,
    } = this.state;
    let newState;

    if (type === 'num') {
      newState = this.handleNumber(type, value);
    } else if (type === 'operation') {
      newState = this.handleOperation(currentNumber, savedNumber, value);
    } else if (value === 'clear') {
      newState = this.handleClearC();
    } else if (value === 'clear-all') {
      newState = this.handleClearAll();
    } else if (value === 'convert') {
      newState = this.handleConvert();
    } else if (value === 'memo-save') {
      newState = this.handleMemoSave();
    } else if (value === 'memo-add') {
      newState = this.handleMemoAdd(memoValue, savedNumber);
    } else if (value === 'memo-subtract') {
      newState = this.handleMemoSubtract(memoValue, savedNumber);
    } else if (value === 'memo-rec') {
      newState = this.handleMemoRec(memoValue);
    } else if (value === 'percent') {
      newState = this.handlePercent();
    } else if (value === 'dot') {
      if (`${currentNumber}`.indexOf('.') === -1) {
        newState = this.handleDot(currentNumber);
      }
    } else if (value === '00') {
      newState = this.handleDoubleZero(type, currentNumber);
    } else if (value === 'set-vat') {
      newState = this.handleSetVat(vatPercent);
    } else if (value === 'add-vat') {
      newState = this.handleAddVat(vatPercent, currentNumber);
    } else if (value === 'without-vat') {
      newState = this.handleWithoutVat(vatPercent, currentNumber);
    } else if (value === 'equals') {
      newState = this.handleEquals();
    }

    this.setState(newState);
  }

  render() {
    const {
      currentNumber, savedNumber, operation, vatPercent,
    } = this.state;

    return (
      <div className={styles.calculator}>
        <Row column center>
          <Column>
            <Result value={currentNumber || savedNumber} />
          </Column>

          <Column>
            <Controls
              vatPercent={vatPercent}
              operation={operation}
              onButtonClick={(type, value) => this.handleButtonClick(type, value)}
            />
          </Column>

        </Row>
      </div>
    );
  }
}

export default Calculator;
