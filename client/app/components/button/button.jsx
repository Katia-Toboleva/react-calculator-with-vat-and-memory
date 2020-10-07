import React from 'react';
import classnames from 'classnames/bind';
import styles from './button.scss';

const cx = classnames.bind(styles);

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseDown: false,
    };
  }

  setDisplay(display, vatPercent) {
    if (vatPercent) {
      return (
        <>
          <div>VAT</div>
          <div>{`${vatPercent}%`}</div>
        </>
      );
    }

    return display;
  }

  handleClick() {
    const { onClick, type, value } = this.props;

    onClick(type, value);
  }

  handleMouseDown() {
    this.setState({
      mouseDown: true,
    });
  }

  handleMouseUp() {
    this.setState({
      mouseDown: false,
    });
  }

  render() {
    const { mouseDown } = this.state;
    const {
      value, display, theme, active, size, vatPercent,
    } = this.props;

    return (
      <div
        className={cx('button', {
          [`button--color-${theme}`]: theme,
          'button--active': active,
          'button--focused': !active && mouseDown,
          [`button--size-${size}`]: size,
          [`button--value-${value}`]: value,
        })}
        onMouseDown={() => this.handleMouseDown()}
        onMouseUp={() => this.handleMouseUp()}
        onClick={() => this.handleClick()}
      >
        <div className={styles.button__text}>
          {this.setDisplay(display, vatPercent)}
        </div>
      </div>
    );
  }
}

Button.defaultProps = {
  size: 'small',
};

export default Button;
