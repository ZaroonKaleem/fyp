// services/auction.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private apiUrl = 'http://localhost:3000/api/auctions';

  constructor(private http: HttpClient) {}

  addAuction(auctionData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, auctionData);
  }

  getAuctions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
    // return this.http.get(`${this.apiUrl}/uploads`);
  }

  deleteAuction(auctionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${auctionId}`);
  }
  
}
