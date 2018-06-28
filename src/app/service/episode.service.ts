import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Response } from '../model/response';
import { Episode } from '../model/episode';
import { EpisodeDataWrapper } from '../model/episodedatawrapper';

import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

 private network = 'http://';
  private port = ':80';
  private service = '/otr-episode-data/rest';
  
  private episodeUrl = 'http://10.0.0.120/otr-episode-data/rest';
  
  private resultSetSize = 20;
  
  private page = 1;
  
  constructor(private http: HttpClient,
              private messageService: MessageService,
              private location:Location) { 
  }
  
  
  setUrl():void {
    this.episodeUrl = this.network + location.hostname + this.port + this.service;
    this.log(this.episodeUrl);
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
      this.messageService.add('episodeService: ' + message);
  }
  
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  
  getQueryParams(): string {
    let params = "?page=" + this.page.toString() +
    "&size=" + this.resultSetSize.toString() +
    "&sort=episodeNumber" +
    "&sortASC=true" +
    "&joinAnd=true";
    return params;
  }
  
  performLookup(params:string): Observable<Response<Episode[]>[]> {
    this.setUrl();
    let headers = this.getHeaders();
    this.log(this.episodeUrl+params);
    return this.http.get<Response<Episode[]>[]>(this.episodeUrl+params, {headers:headers}).pipe(
      tap(episode => this.log(`fetched episode`)),
      catchError(this.handleError('getEpisode', []))
    );
  }
  
  getEpisodes(seriesId:number, restart:boolean): Observable<Response<Episode[]>[]> {
    if (restart) {
      this.page = 1;
    }
    let params = this.getQueryParams() + "&seriesId=" + seriesId;
    return this.performLookup(params);
  }
  
  
    
  /** GET Episode whose title contains search term */
  getEpisodesBySeries (seriesId:number): Observable<Response<Episode[]>[]> {
    
    let params = this.getQueryParams() + "&seriesId=" + seriesId;
    return this.performLookup(params);
  }
  
  getMoreResults(seriesId:number):Observable<Response<Episode[]>[]> {
    this.page++;
    this.log(this.page.toString());
    return this.getEpisodes(seriesId, false);
  }
  
  getEpisode(id: number): Observable<Response<EpisodeDataWrapper>> {
    this.setUrl();
    const url = `${this.episodeUrl}/get/${id}`;
    return this.http.get<Response<EpisodeDataWrapper>>(url).pipe(
      tap(_ => this.log(`fetched Episode id=${id} using ` + url)),
      catchError(this.handleError<Response<EpisodeDataWrapper>>(`getSer id=${id} using ` + url))
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
}
