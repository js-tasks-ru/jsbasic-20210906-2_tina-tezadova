function getMinMax(str) {
  const strArray = str.split(' ');
  let minValue = 0;
  let maxValue = 0;
  for (let i = 0; i < strArray.length; i++) {
    let number = +strArray[i];
    if (!isNaN(number)) {
      if (number < minValue) {
        minValue = number;
      }
      if (number > maxValue) {
        maxValue = number;
      }
    }
    
  }
  return {min: minValue, max: maxValue};
}


