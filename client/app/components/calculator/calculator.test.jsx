import React from 'react';
import { shallow, mount } from 'enzyme';
import Calculator from './calculator';

const getUnit = (props) => (
  shallow(<Calculator {...props} />)
);

describe('Calculator', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Calculator />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('state', () => {
    describe('when the component first mounts', () => {
      it('should match the default state', () => {
        const wrapper = getUnit();
        const expected = {
          savedNumber: 0,
          currentNumber: 0,
          operation: '',
          memoValue: 0,
          vatPercent: 20,
        };
        const received = wrapper.state();

        expect(received).toMatchObject(expected);
      });
    });
  });

  describe('calculateTotal', () => {
    describe('when called', () => {
      it('should return correct total number', () => {
        const states = [
          {
            expected: 15,
            state: { savedNumber: 10, currentNumber: 5, operation: 'add' },
          },
          {
            expected: 50,
            state: { savedNumber: 10, currentNumber: 5, operation: 'multiply' },
          },
          {
            expected: 5,
            state: { savedNumber: 10, currentNumber: 5, operation: 'subtract' },
          },
          {
            expected: 2,
            state: { savedNumber: 10, currentNumber: 5, operation: 'divide' },
          },
          {
            expected: 5,
            state: { savedNumber: 10, currentNumber: 5, operation: undefined },
          },
        ];

        states.forEach((stateItem) => {
          const wrapper = getUnit();
          wrapper.setState(stateItem.state);
          const { expected } = stateItem;
          const received = wrapper.instance().calculateTotal();

          expect(received).toEqual(expected);
        });
      });
    });
  });

  describe('calculatePercent', () => {
    describe('when called', () => {
      it('should return a correct number', () => {
        const states = [
          {
            expected: 0.5,
            state: { savedNumber: 10, currentNumber: 5, operation: 'add' },
          },
          {
            expected: 0.05,
            state: { savedNumber: 0, currentNumber: 5, operation: 'add' },
          },
          {
            expected: 0.5,
            state: { savedNumber: 10, currentNumber: 5, operation: 'subtract' },
          },
          {
            expected: 0.1,
            state: { savedNumber: 10, currentNumber: 0, operation: 'subtract' },
          },
          {
            expected: 0.5,
            state: { savedNumber: 10, currentNumber: 5, operation: undefined },
          },
          {
            expected: 0.05,
            state: { savedNumber: 10, currentNumber: 5, operation: 'divide' },
          },
          {
            expected: 0.05,
            state: { savedNumber: 10, currentNumber: 5, operation: 'multiply' },
          },
        ];

        states.forEach((stateItem) => {
          const wrapper = getUnit();
          wrapper.setState(stateItem.state);
          const { expected } = stateItem;
          const received = wrapper.instance().calculatePercent();

          expect(received).toEqual(expected);
        });
      });
    });
  });

  describe ('convertNumber', () => {
    describe('when called', () => {
      it('should return a correct value', () => {
        const states = [
          {
            expected: -10,
            state: { savedNumber: 10, currentNumber: 0, operation: undefined },
          },
          {
            expected: -5,
            state: { savedNumber: 10, currentNumber: 5, operation: undefined },
          },
          {
            expected: -5,
            state: { savedNumber: 0, currentNumber: 5, operation: undefined },
          },
          {
            expected: '-0',
            state: { savedNumber: 0, currentNumber: 0, operation: undefined },
          },
          {
            expected: '-0',
            state: { savedNumber: 10, currentNumber: 0, operation: 'multiply' },
          },
          {
            expected: -5,
            state: { savedNumber: 10, currentNumber: 5, operation: 'multiply' },
          },
          {
            expected: '-0',
            state: { savedNumber: 0, currentNumber: 0, operation: 'add' },
          },
          {
            expected: -10,
            state: { savedNumber: 0, currentNumber: 10, operation: 'subtract' },
          },
        ];

        states.forEach((stateItem) => {
          const wrapper = getUnit();
          wrapper.setState(stateItem.state);
          const {expected} = stateItem;
          const received = wrapper.instance().convertNumber();

          expect(received).toEqual(expected);
        });
      });
    });
  });

  describe('recordValue', () => {
    describe('when called', () => {
      it('should return correct number', () => {
        const states = [
          {
            expected: 5,
            state: {currentNumber: 10, savedNumber: 5},
          },
          {
            expected: 10,
            state: {currentNumber: 10, savedNumber: 0},
          },
          {
            expected: 0,
            state: {currentNumber: 0, savedNumber: 0},
          },
          {
            expected: 5,
            state: {currentNumber: 0, savedNumber: 5},
          },
        ];

        states.forEach((stateItem) => {
          const wrapper = getUnit();
          wrapper.setState(stateItem.state);
          const { expected } = stateItem;
          const received = wrapper.instance().recordValue();

          expect(received).toEqual(expected);
        });
      });
    });
  });

  describe('handleWithoutVat', () => {
    describe('when called', () => {
      it('should return a number', () => {
        const states = [
          {
            expected: 83.33,
            state: { currentNumber: 0, savedNumber: 100, vatPercent: 20 },
          },
          {
            expected: 83.33,
            state: { currentNumber: 100, savedNumber: 0, vatPercent: 20 },
          },
        ];

        states.forEach((stateItem) => {
          const wrapper = getUnit();
          wrapper.setState(stateItem.state);
          const { expected } = stateItem;
          const received = wrapper.instance().handleWithoutVat().currentNumber;
          expect(received).toEqual(expected);
        });
      });
    });
  });

  describe('when I subtract VAT', () => {
    describe('and I want to perform a subtraction', () => {
      it('should return the correct result', () => {
        const wrapper = mount(<Calculator />);
        const buttonOne = wrapper.find({ display: '1' });
        const buttonZero = wrapper.find({ display: '0' });
        const buttonMinusVat = wrapper.find({ display: '- VAT' });
        const buttonSubtract = wrapper.find({ display: '-' });
        const buttonEqual = wrapper.find({ display: '=' });
        buttonOne.simulate('click');
        buttonZero.simulate('click');
        buttonZero.simulate('click');
        buttonMinusVat.simulate('click');
        buttonSubtract.simulate('click');
        buttonOne.simulate('click');
        buttonOne.simulate('click');
        buttonEqual.simulate('click');

        expect(wrapper.state().savedNumber).toBe(72.33);
      });
    });
  });
});
