import React from 'react';
import { shallow } from 'enzyme';
import Button from './button';

describe('Button', () => {
  describe('render', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Button
        type="function"
        value="clear"
        display="C"
        theme="dark"
        size="big"
      />);

      expect(wrapper).toMatchSnapshot();
    });

    describe('when I am not passing the size prop', () => {
      it('should render correctly', () => {
        const wrapper = shallow(<Button
          type="function"
          value="clear"
          display="C"
          theme="dark"
        />);

        expect(wrapper).toMatchSnapshot();
      });

      it('should add size "small" prop', () => {
        const wrapper = shallow(<Button
          type="function"
          value="clear"
          display="C"
          theme="dark"
        />);

        const received = wrapper.instance().props.size;
        const expected = 'small';

        expect(received).toEqual(expected);
      });
    });
  });
});
