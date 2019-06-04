import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Response } from '../model/response';
import { AudioFile } from '../model/audiofile';
import { PayloadWithCount } from '../model/payloadwithcount';

import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AudioFileService {
private network = 'http://';
  private port = ':80';
  private service = '/Monolith/rest/audio';
  
  private episodeUrl = 'http://10.0.0.120/Monolith/rest/audio';
  
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
    "&sort=filename" +
    "&sortASC=true" +
    "&joinAnd=true";
    return params;
  }
  
  performLookup(params:string): Observable<Response<PayloadWithCount<AudioFile[]>>[]> {
    this.setUrl();
    let headers = this.getHeaders();
    this.log(this.episodeUrl+params);
    return this.http.get<Response<PayloadWithCount<AudioFile[]>>[]>(this.episodeUrl+params, {headers:headers}).pipe(
      tap(episode => this.log(`fetched audio files`)),
      catchError(this.handleError('get audio files', []))
    );
  }
  
  getAudioFiles(episodeId:number, restart:boolean): Observable<Response<PayloadWithCount<AudioFile[]>>[]> {
    if (restart) {
      this.page = 1;
    }
    let params = this.getQueryParams() + "&episodeId=" + episodeId;
    return this.performLookup(params);
  }
  
  getEpisodeAudioFiles(episodeId:number): Observable<Response<AudioFile[]>> {
    this.setUrl();
    const url = `${this.episodeUrl}/episodes/${episodeId}`;
    return this.http.get<Response<AudioFile[]>>(url).pipe(
      tap(_ => this.log(`fetched Episodes for Episode id=${episodeId} using ` + url)),
      catchError(this.handleError<Response<AudioFile[]>>(`getEpisodes for Episode id=${episodeId} using ` + url))
    );
  }
    
  /** GET Episode whose title contains search term */
  searchEpisode (seriesId:number, term: string): Observable<Response<PayloadWithCount<AudioFile[]>>[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    let params = this.getQueryParams() + "&seriesId=" + seriesId.toString + "&title=" + term;
    return this.performLookup(params);
  }
  
  getMoreResults(seriesId:number):Observable<Response<PayloadWithCount<AudioFile[]>>[]> {
    this.page++;
    this.log(this.page.toString());
    return this.getAudioFiles(seriesId, false);
  }
  
  getAudioFile(id: number): Observable<Response<AudioFile>> {
    this.setUrl();
    const url = `${this.episodeUrl}/get/${id}`;
    return this.http.get<Response<AudioFile>>(url).pipe(
      tap(_ => this.log(`fetched Episode id=${id} using ` + url)),
      catchError(this.handleError<Response<AudioFile>>(`getSer id=${id} using ` + url))
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
