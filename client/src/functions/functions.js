export function sortOrder(array, valueToCompare, optionalValue) {
  array.sort(function (a, b) {
    if (optionalValue !== undefined) {
      var dogA = a[valueToCompare] + a[optionalValue];
      var dogB = b[valueToCompare] + b[optionalValue];
    } else {
      var dogA = a[valueToCompare].toLowerCase();
      var dogB = b[valueToCompare].toLowerCase();
    }
    if (dogA < dogB) {
      return -1;
    }
    if (dogA > dogB) {
      return 1;
    }
    return 0;
  });
  return array;
}
