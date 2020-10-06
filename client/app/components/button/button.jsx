import React from 'react';
import styles from './button.scss';

import classnames from 'classnames/bind'

const cx = classnames.bind(styles);

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseDown: false,
    };
  }

  handleClick() {
    this.props.onClick(this.props.type, this.props.value);
  };

  handleMouseDown() {
    this.setState({
      mouseDown: true,
    });
  };

  handleMouseUp() {
    this.setState({
      mouseDown: false,
    });
  };

  setDisplay(display, vatPercent) {
    if (vatPercent) {
      return (
        <React.Fragment>
          <div>VAT</div>
          <div>{`${vatPercent}%`}</div>
        </React.Fragment>
      );
    } else {
      return display;
    }
  }

  render() {
    const { mouseDown } = this.state;
    const { value, display, theme, active, size, vatPercent } = this.props;

    return (
      <div
        className={cx('button', {
          [`button--color-${theme}`] : theme,
          'button--active' : active,
          'button--focused': !active && mouseDown,
          [`button--size-${size}`]: size,
          [`button--value-${value}`]: value,
        })}
        onMouseDown={() => this.handleMouseDown()}
        onMouseUp={() => this.handleMouseUp()}
        onClick={() => this.handleClick()}
      >
        <div className = {styles['button__text']}>
          {this.setDisplay(display, vatPercent)}
        </div>
      </div>
    )
  }
}

Button.defaultProps = {
  size: 'small',
}

export default Button;
