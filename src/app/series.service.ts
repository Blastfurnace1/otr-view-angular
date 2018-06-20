import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Response } from './response';
import { Series } from './series';
import { TEST_SERIES } from './mock-series';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  
  private seriesUrl = 'api/series';
  
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
      this.messageService.add('SeriesService: ' + message);
  }
  
  getSeries(): Observable<Series[]> {
    
    return this.http.get<Series[]>(this.seriesUrl).pipe(
      tap(series => this.log(`fetched series`)),
      catchError(this.handleError('getSeries', []))
    );
  }
  
  getSer(id: number): Observable<Series> {
    const url = `${this.seriesUrl}/${id}`;
    return this.http.get<Series>(url).pipe(
      tap(_ => this.log(`fetched Series id=${id}`)),
      catchError(this.handleError<Series>(`getSer id=${id}`))
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
