import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTopNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/news`);
  }

  searchNews(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: { q: query },
    });
  }
}
