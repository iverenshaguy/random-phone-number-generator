import generateUniqueNumbers from '../generateUniqueNumbers';

describe('Unique Numbers Generator', () => {
  it('should generate an array of unique numbers with default count of 5000 and sort of ASC', () => {
    const numbers = generateUniqueNumbers();

    expect(numbers.length).toEqual(10000);
    expect(Boolean(numbers[9999] - numbers[0])).toEqual(true);
  });

  it('should generate an array of unique numbers with count of 1000 and sort of DESC', () => {
    const numbers = generateUniqueNumbers([], 1000, 'DESC');

    expect(numbers.length).toEqual(1000);
    expect(Boolean(numbers[0] - numbers[999])).toEqual(true);
  });
});
