import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  public get<T>(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http
      .get<T>(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  public patch<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .patch<T>(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  public put<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .put<T>(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: { 'Content-type': 'application/json' },
      })
      .pipe(catchError(this.formatErrors));
  }

  public post<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .post<T>(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: { 'Content-type': 'application/json' },
      })
      .pipe(catchError(this.formatErrors));
  }
  public postFile<T>(
    path: string,
    body: object = {},
    option: object = {}
  ): Observable<T> {
    return this.http
      .post<T>(`${environment.api_url}${path}`, body, option)
      .pipe(catchError(this.formatErrors));
  }

  public delete<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .delete<T>(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }
}
