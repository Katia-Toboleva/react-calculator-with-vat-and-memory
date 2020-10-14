import React from 'react';
import { shallow, mount } from 'enzyme';
import Calculator from './calculator';

describe('Calculator', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Calculator />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('handleWithoutVat', () => {
    describe('when called', () => {
      it('should return a number', () => {
        const wrapper = shallow(<Calculator />);
        const received = wrapper.instance().handleWithoutVat(20, 100);
        const expected = { currentNumber: 83.33 };

        expect(received).toMatchObject(expected);
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
