export interface IResponseApiWrapper<T> {
  code: number;
  status: string;
  attributionText: string;
  attributionHTML: string;
  data?: T;
  etag: string;
}
