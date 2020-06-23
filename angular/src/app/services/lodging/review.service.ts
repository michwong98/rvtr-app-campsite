import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Review } from '../../data/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  private readonly apiUrl$: Observable<string>;

  /**
   * Represents the _Review Service_ `constructor` method
   *
   * @param config ConfigService
   * @param http HttpClient
   */
  constructor(private readonly config: ConfigService, private readonly http: HttpClient) {
    this.apiUrl$ = config.get().pipe(map((cfg) => `${cfg.api.lodging}/Review`));
  }

  /**
   * Represents the _Review Service_ `delete` method
   *
   * @param id string
   */
  delete(id: string): Observable<Review> {
    return this.apiUrl$.pipe(
      map(url => `${url}/${id}`),
      concatMap((url) => this.http.delete<Review>(url, { params: { id } }))
    );
  }

  /**
   * Represents the _Review Service_ `get` method
   *
   * @param id string
   */
  get(id?: string, params?: HttpParams): Observable<Review[]> {
    const options = params ? { params } : {};
    return this.apiUrl$.pipe(
      map(url => id ? `${url}/${id}` : url),
      concatMap((url) => this.http.get<Review[]>(url, options)));
  }

  /**
   * Represents the _Review Service_ `post` method
   *
   * @param review Review
   */
  post(review: Review): Observable<Review> {
    return this.apiUrl$.pipe(concatMap((url) => this.http.post<Review>(url, review)));
  }
}
