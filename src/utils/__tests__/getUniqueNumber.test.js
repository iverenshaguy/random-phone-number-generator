// import sinon from 'sinon';
// import { assert } from 'chai';

import generateNumber from '../generateNumber';
import getUniqueNumber from '../getUniqueNumber';

jest.mock('../generateNumber');

describe('Unique Number Generator', () => {
  it('should try to generate another number if previous data already contains the generated number', () => {
    generateNumber
      .mockImplementationOnce(() => 1)
      .mockImplementationOnce(() => 5);

    getUniqueNumber([1, 2]);

    expect(generateNumber.mock.calls.length).toEqual(2);
    generateNumber.mockRestore();
  });

  it('should not try to generate another number if previous data does not contain the generated number', () => {
    generateNumber.mockImplementationOnce(() => 5)

    getUniqueNumber([1, 2]);

    expect(generateNumber.mock.calls.length).toEqual(1);
    generateNumber.mockRestore();
  });
});
