// iso-message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsoMessageService {
  private apiUrl = 'http://localhost:8080/api/iso-messages';

  constructor(private http: HttpClient) {}

  decodeMessage(hexMessage: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decode`, { hexMessage });
  }

  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMessageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMessage(message: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, message);
  }
}
