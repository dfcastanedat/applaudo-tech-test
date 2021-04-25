export const buildParams = <T>(params: T): T => {
  const newParams: T = {} as T;
  Object.entries(params).map((item) => {
    if (item[1]) {
      newParams[item[0]] = item[1];
    }
  });
  console.log(newParams);
  return newParams;
};
