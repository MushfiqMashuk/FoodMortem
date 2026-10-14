const validateName = (str) => {
  // checking if the string empty or not

  if (str.length < 1) return false;

  const CharacterOnly = /^[A-Za-z\s]+$/;

  return CharacterOnly.test(str) ? true : false;
};

export default validateName;
