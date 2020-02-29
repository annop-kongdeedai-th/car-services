export const currency = (value: any, n?: number, x?: number): string => {
  const _n = n !== undefined ? n : 0;
  const _x = x || 3;
  if (value || value === 0) {
    const calVal = value instanceof Number ? value : +value;
    const re = "\\d(?=(\\d{" + _x + "})+" + (_n > 0 ? "\\." : "$") + ")";

    return calVal
      .toFixed(Math.max(0, ~~_n))
      .replace(new RegExp(re, "g"), "$&,");
  } else {
    return "0.00";
  }
};
