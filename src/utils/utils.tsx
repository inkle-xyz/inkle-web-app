// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys; const tx = typeof x; const ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length
    && ok(x).every((key) => deepEqual(x[key], y[key]))
  ) : (x === y);
};
