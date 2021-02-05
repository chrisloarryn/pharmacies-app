export const splitBy = (str) =>
  str
    .split(/(..)/g)
    .filter((s) => s)
    .join(':')
