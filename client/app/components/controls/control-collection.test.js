import {
  leftControlsProps,
  rightControlsProps,
  bottomControlsProps,
} from './control-collection';

const collection = [leftControlsProps, rightControlsProps, bottomControlsProps].flat();

describe('Control collection', () => {
  describe('numbers', () => {
    const numbers = collection.filter((item) => item.type === 'num');
    it('should have the same format', () => {
      numbers.forEach((item) => {
        expect(typeof item.value).toBe('number');
        expect(typeof item.display).toBe('string');
        expect(typeof item.theme).toBe('string');
        expect(typeof item.id).toBe('number');
        expect(typeof item.type).toBe('string');
        expect(`${item.value}`).toBe(item.display);
      });
    });

    it('should contain the right amount of objects', () => {
      const expected = 10;
      const received = numbers.length;

      expect(received).toBe(expected);
    });
  });
});
