export const formatWithKanji = (number: number) => {
  const digitCount = Math.floor(Math.log10(number)) + 1;

  let largestGroup;
  if (digitCount <= 4) {
    largestGroup = "";
  } else if (digitCount <= 8) {
    largestGroup = "万";
  } else if (digitCount <= 12) {
    largestGroup = "億";
  }

  const formattedNumber =
    number / Math.pow(10, 4 * Math.floor((digitCount - 1) / 4));
  return `${formattedNumber.toFixed(0)}${largestGroup}`;
};
