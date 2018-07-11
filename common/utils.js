// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function zeroPadHex(i) {
  let x = parseInt(i,16);
  if (x < 16) {
    i = "0" + i;
  }
  return i;
}
