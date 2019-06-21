import getUniqueNumber from './getUniqueNumber';
import sortNumbers from './sortNumbers';

/**
 * Generate unique numbers
 *
 * @param {number} count count
 *
 * @returns {number} the unique number
 */
const generateUniqueNumbers = (prevResults = [], count = 10000, sort = 'ASC') => {
  const generated = [];

  for(let i = count; i > 0; i--) {
    const uniqueNumber = getUniqueNumber([...prevResults, ...generated]);
    generated.push(uniqueNumber);
  }

  return sortNumbers(generated, sort);
};

export default generateUniqueNumbers;
