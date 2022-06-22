export function getCase(items, casesArray) {
  if (Math.floor(items / 10) % 10 === 1) {
    return casesArray[2];
  } else {
    if (items % 10 === 1) {
      return casesArray[0];
    } else if (1 < items % 10 && items % 10 <= 4) {
      return casesArray[1];
    } else {
      return casesArray[2];
    }
  }
}
