import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:5182/SalesReport'; // Adjust the URL if necessary

  constructor(private http: HttpClient) { }

  getSalesReport(): Observable<{
    totalRevenue: number,
    mostSoldProducts: any[], // Adjust types as necessary
    productsSold: { product: any, quantity: number, totalRevenue: number }[]
  }> {
    return this.http.get<{
      totalRevenue: number,
      mostSoldProducts: any[],
      productsSold: { product: any, quantity: number, totalRevenue: number }[]
    }>(this.apiUrl);
  }
}
