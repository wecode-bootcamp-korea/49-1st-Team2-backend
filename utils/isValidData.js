/**
 * isValidData
 * @param {string | RegExp} reg - 정규 표현식
 * @param {string} validationTarget - 검증할 문자열
 * @returns
 */
exports.isValidData = (reg, validationTarget) => {
  return reg.test(validationTarget);
};
