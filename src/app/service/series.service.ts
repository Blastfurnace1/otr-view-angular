import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Response } from '../model/response';
import { Series } from '../model/series';
import { SeriesDataWrapper } from '../model/seriesdatawrapper';

import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
//import { TEST_SERIES } from './mock-series';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  
  private network = 'http://';
  private port = ':80';
  private service = '/otr-series-data/rest';
  
  private seriesUrl = 'http://10.0.0.120/otr-series-data/rest';
  
  private resultSetSize = 20;
  
  private page = 1;
  
  constructor(private http: HttpClient,
              private messageService: MessageService,
              private location:Location) { 
  }
  
  
  setUrl():void {
    this.seriesUrl = this.network + location.hostname + this.port + this.service;
    this.log(this.seriesUrl);
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
      this.messageService.add('SeriesService: ' + message);
  }
  
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  
  getQueryParams(): string {
    let params = "?page=" + this.page.toString() +
    "&size=" + this.resultSetSize.toString() +
    "&sort=title" +
    "&sortASC=true" +
    "&joinAnd=true";
    return params;
  }
  
  performLookup(params:string): Observable<Response<Series[]>[]> {
    this.setUrl();
    let headers = this.getHeaders();
    this.log(this.seriesUrl+params);
    return this.http.get<Response<Series[]>[]>(this.seriesUrl+params, {headers:headers}).pipe(
      tap(series => this.log(`fetched series`)),
      catchError(this.handleError('getSeries', []))
    );
  }
  
  getSeries(restart:boolean): Observable<Response<Series[]>[]> {
    if (restart) {
      this.page = 1;
    }
    let params = this.getQueryParams();
    return this.performLookup(params);
  }
  
  /** GET Series whose title contains search term */
  searchSeries (term: string): Observable<Response<Series[]>[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    let params = this.getQueryParams() + "&title=" + term;
    return this.performLookup(params);
  }
  
  getMoreResults(term:string):Observable<Response<Series[]>[]> {
    this.page++;
    this.log(this.page.toString());
    if (term.length > 0) {
      return this.searchSeries (term);
    }
    return this.getSeries(false);
  }
  
  getSer(id: number): Observable<Response<SeriesDataWrapper>> {
    this.setUrl();
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
    this.setUrl();
    return this.http.put(this.seriesUrl, series, httpOptions).pipe(
      tap(_ => this.log(`updated series id=${series.id}`)),
      catchError(this.handleError<any>('updateSeries'))
    );
  }
    
    /** POST: add a new hero to the server */
  addSeries (series: Series): Observable<Series> {
    this.setUrl();
    return this.http.post<Series>(this.seriesUrl, series, httpOptions).pipe(
      tap((series: Series) => this.log(`added Series w/ id=${series.id}`)),
      catchError(this.handleError<Series>('addSeries'))
    );
  }
  
  /** DELETE: delete the hero from the server */
  deleteSeries (ser: Series | number): Observable<Series> {
  this.setUrl();
  const id = typeof ser === 'number' ? ser : ser.id;
  const url = `${this.seriesUrl}/${id}`;

  return this.http.delete<Series>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted Series id=${id}`)),
    catchError(this.handleError<Series>('delete<Series>'))
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
