export const countObjectProperties = (obj) => { // eslint-disable-line
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }
  return 0;
};
