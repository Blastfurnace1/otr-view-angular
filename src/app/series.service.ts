import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Response } from './response';
import { Series } from './series';
import { SeriesDataWrapper } from './seriesdatawrapper';
import { QueryParams } from './queryparams';

import { TEST_SERIES } from './mock-series';
import { HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  
  private seriesUrl = 'http://localhost/otr-series-data/rest';
  
  private resultSetSize = 20;
  
  private page = 1;
  
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
      this.messageService.add('SeriesService: ' + message);
  }
  
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  
  getMoreResults():Observable<Response<Series[]>[]> {
    this.page++;
    this.log(this.page.toString());
    return this.getSeries(false);
  }
  
  oldgetQueryParams(): HttpParams {
    let params = new HttpParams();
    params.set("page", this.page.toString());
    params.set("size", this.resultSetSize.toString());
    params.set("sort", "title");
    params.set("sortAscending", "false");
    params.set("joinAnd", "true");
    return params;
  }
  
  getQueryParams(): string {
    let params = "?page=" + this.page.toString() +
    "&size=" + this.resultSetSize.toString() +
    "&sort=title" +
    "&sortAscending=false" +
    "&joinAnd=true";
    return params;
  }
  
  getSeries(restart:boolean): Observable<Response<Series[]>[]> {
    if (restart) {
      this.page = 1;
    }
    let params = this.getQueryParams();
    let headers = this.getHeaders();
    this.log(this.seriesUrl+params);
    return this.http.get<Response<Series[]>[]>(this.seriesUrl+params, {headers:headers}).pipe(
      tap(series => this.log(`fetched series`)),
      catchError(this.handleError('getSeries', []))
    );
  }
  
  getSer(id: number): Observable<Response<SeriesDataWrapper>> {
    const url = `${this.seriesUrl}/get/${id}`;
    return this.http.get<Response<SeriesDataWrapper>>(url).pipe(
      tap(_ => this.log(`fetched Series id=${id} using ` + url)),
      catchError(this.handleError<Response<SeriesDataWrapper>>(`getSer id=${id} using ` + url))
    );
  }
      
  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
   */
   private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
   }
  
  /** PUT: update the hero on the server */
  updateSeries (series: Series): Observable<any> {
    return this.http.put(this.seriesUrl, series, httpOptions).pipe(
      tap(_ => this.log(`updated series id=${series.id}`)),
      catchError(this.handleError<any>('updateSeries'))
    );
  }
    
    /** POST: add a new hero to the server */
  addSeries (series: Series): Observable<Series> {
    return this.http.post<Series>(this.seriesUrl, series, httpOptions).pipe(
      tap((series: Series) => this.log(`added Series w/ id=${series.id}`)),
      catchError(this.handleError<Series>('addSeries'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteSeries (ser: Series | number): Observable<Series> {
  const id = typeof ser === 'number' ? ser : ser.id;
  const url = `${this.seriesUrl}/${id}`;

  return this.http.delete<Series>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted Series id=${id}`)),
    catchError(this.handleError<Series>('delete<Series>'))
  );
  }
    
      /* GET heroes whose name contains search term */
  searchSeries (term: string): Observable<Series[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Series[]>(`${this.seriesUrl}/?title=${term}`).pipe(
    tap(_ => this.log(`found series matching "${term}"`)),
    catchError(this.handleError<Series[]>('searchSeries', []))
  );
}
  
  // uses mock service
  
//  oldgetSeries(): Observable<Series[]> {
//    this.log(' fetching all Series');
//    return of(TEST_SERIES);
//  }
//
//   oldgetSer(id: number): Observable<Series> {
//    // TODO: send the message _after_ fetching the hero
//    this.log(` fetching Series id=${id}`);
//    return of(TEST_SERIES.find(series => series.id === id));
//  }
  
}
