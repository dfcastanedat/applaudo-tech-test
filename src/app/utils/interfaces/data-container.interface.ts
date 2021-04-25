export interface IDataContainer<T> {
  offset: number;
  limit: number;
  total: number;
  count: string;
  results?: T[];
}
