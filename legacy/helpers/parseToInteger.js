const parseToInteger = (number) => {
  const parsed = parseInt(number);

  return isNaN(parsed) ? 0 : parsed;
};

export default parseToInteger;
