import { environment } from 'src/environments/environment';

type ApiMethod = string;

export const getApiUrl = (...concatParams: ApiMethod[]): string => {
  return `${environment.apiUrl}/${concatParams.join('/')}`;
};
