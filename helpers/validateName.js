const validateName = (str) => {
  // checking if the string empty or not

  if (str.length < 1) return false;

  const CharacterOnly = /^[A-Za-z]+$/;

  if (CharacterOnly.test(str)) {
    return true;
  } else false;
};

export default validateName;
