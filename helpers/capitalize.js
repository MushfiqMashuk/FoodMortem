const capitalize = (sentence) => {
  const finalSentence = sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  return finalSentence;
};

export default capitalize;
