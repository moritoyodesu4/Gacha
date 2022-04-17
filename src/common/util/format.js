/**
 * 桁区切りを入れた数値を返す
 * @param {Number, String} n 数値
 * @returns {String} 桁区切りを含めた数値の文字列
 */
const separateCharacterNumber = (n) => {
  const number = parseInt(n, 10);
  if (number) {
    return number.toLocaleString();
  }
  return '0';
};

const parseNumberArrayToStringArray = (numberArray) => {
  const stringArray = numberArray.map((number) => (String(number)), []);
  return stringArray;
};

export {
  separateCharacterNumber,
  parseNumberArrayToStringArray,
};
