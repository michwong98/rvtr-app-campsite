import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Lodging } from '../../data/lodging.model';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  private readonly apiUrl$: Observable<string>;

  /**
   * Represents the _Lodging Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => `${cfg.api.lodging}/Lodging`));
  }

  /**
   * Represents the _Lodging Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<Lodging> {
    return this.apiUrl$.pipe(
      map(url => `${url}/${id}`),
      concatMap((url) => this.http.delete<Lodging>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Lodging Service_ `get` method
   *
   * @param id string
   */
  get(id?: string, params?: HttpParams): Observable<Lodging[]> {
    const options = params ? { params } : {};
    return this.apiUrl$.pipe(
      map(url => id ? `${url}/${id}` : url),
      concatMap((url) => this.http.get<Lodging[]>(url, options)));
  }

  /**
   * Represents the _Lodging Service_ `post` method
   *
   * @param lodging Lodging
   */
  post(lodging: Lodging): Observable<Lodging> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<Lodging>(url, lodging)));
  }
}
