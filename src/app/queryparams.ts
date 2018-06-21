export class QueryParams {
  page: number;
  
  size: number;

  sort: string;
  
  sortAscending: boolean;
  
  joinAnd: boolean;
  
  map: Map<string, string>;
}
