export const isNull = (val: unknown): val is null => val === null;

export const isUndefined = (val: unknown): val is undefined =>
  val === undefined;

export const isDef = <T>(val: T): val is NonNullable<T> =>
  !isNull(val) && !isUndefined(val);

export const simpleClone = <T extends unknown>(val: T): T | null => {
  try {
    return JSON.parse(JSON.stringify(val));
  } catch (error) {
    return null;
  }
};
