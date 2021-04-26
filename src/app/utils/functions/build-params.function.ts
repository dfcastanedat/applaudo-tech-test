import { HttpParams } from '@angular/common/http';

export const buildParams = <T>(params: T): HttpParams => {
  const newParams: T = {} as T;
  Object.entries(params).map((item) => {
    if (item[1]) {
      newParams[item[0]] = item[1];
    }
  });
  let httpParams = new HttpParams();
  Object.keys(newParams).forEach((k) => {
    httpParams = httpParams.set(k, params[k]);
  });
  return httpParams;
};
